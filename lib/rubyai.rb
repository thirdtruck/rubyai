# Class Macros
class << Object
	def wrap_callbacks_around(target_class, *methods)
		methods.each do |method|
			method_name = method.to_s
			before_method = "before_#{method_name}"
			within_method = "within_#{method_name}"
			after_method = "after_#{method_name}"
			unwrapped_method = "unwrapped_#{method_name}"
			
			target_class.class_eval do
				eval "def #{before_method};end"
				eval "def #{within_method}(*args, &block);end"
				eval "def #{after_method};end"
				eval "alias #{unwrapped_method} #{method_name}"
				eval "def #{method_name}(*args, &block); #{before_method};original_results = #{unwrapped_method}(*args, &block);#{after_method};original_results;end;"
			end
		end
	end
end

module RubyAi
	class StageElement
		attr_reader :alias, :name, :description
		
		def initialize(element_alias, name, description="")
			@alias = element_alias
			@name = name
			@description = description
		end
		
		# TODO: to_s and show_as can probably be replaced with a single, more explicit method.  to_s should probably *not* be this method.
		def to_s
			@name
		end
		
		def show_as
		end
	end
	
	class Character < StageElement
	end
	
	class Stage < StageElement
		def show_as
			@description
		end
	end
	
	class Sound < StageElement
	end
	
	class Scene
		attr_accessor :contents
		
		def initialize(&block)
			@contents = []
			@contents << block if block
		end
		
		def append(&block)
			@contents << block
		end
		
		def run
			for block in @contents
				block.call
			end
		end
	end
	class Choice
		attr_accessor :options
		attr_reader :game
		
		class Option
			attr_accessor :description, :block
			
			def initialize(description, &block)
				@description = description
				@block = block
			end
			
			# TODO: Add a parameter and place for explicit numbering/labeling of option triggers
		end
		
		def initialize(results_context, &block)
			@results_context = results_context
			@options = []
			@stringified = nil
			instance_eval(&block) if block
		end
		
		def option(description, &block)
			new_option = Option.new(description, &block)
			@options << new_option
		end
		
		def user_chooses(choice)
			# TODO: make this require a valid option; *.to_i automatically defaults to zero and so supplies an inadvertent default of the final choice.
			@options[choice.to_i-1].block
		end
		
		def method_missing(method, *args, &block)
			@results_context.send(method, *args, &block)
		end

		wrap_callbacks_around self, :user_chooses
	end
	class Game
		attr_reader :characters, :stages, :scenes
		
		def initialize(input, output, source_filename=nil)
			@characters = { }
			@stages = { }
			@sounds = { }
			@scenes = { }
			@input = input == nil ? Kernel : input
			@output = output == nil ? Kernel: output
			@source_file = source_filename ? File.open(source_filename).read : nil
		end
		
		def start
			eval(@source_file) if @source_file
			within_start
		end
		
		def game_over(type=nil)
			within_game_over(type)
		end
		
		def choice(&block)
			current_choice = Choice.new(self, &block)
			within_choice(current_choice)
		end
		
		def narrate(*statements)
			within_narrate(*statements)
		end
		
		def speak(character, statement)
			within_speak(character, statement)
		end
		
		def action(character, does_thing)
			within_action(character, does_thing)
		end
		
		def says(statement)
			def statement.command_type
				:statement
			end
			statement
		end
		def thusly(does_thing)
			def does_thing.command_type
				:action
			end
			does_thing
		end
		
		def _append_to_scene(scene, &block)
			@scenes[scene].append(&block)
		end
		
		def parse_script(&block)
			instance_eval(&block) if block_given?
		end
		
		def dynamic_character(character_alias, *commands)
			character = @characters[character_alias]
			commands.each do |command|
				if command.respond_to? :command_type
					# it's already a command
				elsif command =~ /^[a-z]/
					thusly(command)
				else
					says(command)
				end
			end
			
			commands.each do |command|
				if command.command_type == :statement
					speak(character, command)
				elsif command.command_type == :action
					action(character, command)
				else
					raise NoMethodError.new "No such method: #{method} for character #{character.name}"
				end
			end
			return character
		end
		
		def for_characters
			def add(character_alias, character_name)
				@characters[character_alias] = Character.new(character_alias, character_name)
				
				self.class.class_eval do
					eval "def #{character_alias.to_s}(*commands); dynamic_character(:#{character_alias.to_s}, *commands); end"
				end
			end
			
			yield if block_given?
		end
		
		def dynamic_sound(sound_id)
			sound = @sounds[sound_id]
			
			return sound
		end
		
		def for_sounds
			def add(sound_id, sound_name)
				@sounds[sound_id] = Sound.new(sound_id, sound_name)
				
				self.class.class_eval do
					eval "def #{sound_id.to_s}(*commands); dynamic_sound(:#{sound_id.to_s}, *commands); end"
				end
			end
			
			yield if block_given?
		end
		
		def dynamic_stage(stage_alias, *commands)
			stage = @stages[stage_alias]
			return stage
		end
		
		def for_stages
			def add(stage_alias, stage_name)
				@current_description = ""
				
				def describe_as(new_description)
					@current_description = new_description
				end
				
				yield if block_given?
				
				@stages[stage_alias] = Stage.new(stage_alias, stage_name, @current_description)
				
				self.class.class_eval do
					eval "def #{stage_alias.to_s}(*commands); dynamic_stage(:#{stage_alias.to_s}, *commands); end"
				end
			end
			
			yield if block_given?
		end
		
		def add_scene(scene_alias, &block)
			@scenes[scene_alias] = Scene.new(&block)
			within_add_scene(scene_alias, &block)
		end
		
		def run_scene(scene_alias)
			within_run_scene(scene_alias)
		end
		
		def show(element, image_name=nil)
			case
				when image_name then show_image(element, image_name)
				when element.respond_to?(:show_as)then show_element(element)
			end
		end
		
		def show_element(element)
			within_show_element(element)
		end
		
		def show_image(element, image_name)
			within_show_image(element, image_name)
		end
		
		def hide(element)
			within_hide(element)
		end
		
		def sound(sound_element)
			within_sound(sound_element)
		end
		
		wrap_callbacks_around self, :start, :sound, :hide, :speak, :action, :show_image, :show_element, :run_scene, :choice, :game_over, :narrate, :add_scene
	end
end
