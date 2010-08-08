require 'delegate'
require 'lib/novel_elements'
require 'lib/scene'

# Class Macros
module CallbackWrapper
	def self.included(base)
		def base.wrap_callbacks_around(*methods)
			methods.each do |method|
				method_name = method.to_s
				before_method = "before_#{method_name}"
				within_method = "within_#{method_name}"
				after_method = "after_#{method_name}"
				unwrapped_method = "unwrapped_#{method_name}"
				
				self.class_eval do
					define_method before_method.to_sym do
					end
					define_method after_method.to_sym do
					end
					# TODO: Find ways around these `eval` calls
					eval "def #{within_method}(*args, &block);end"
					eval "alias #{unwrapped_method} #{method_name}"
					eval "def #{method_name}(*args, &block); #{before_method};original_results = #{unwrapped_method}(*args, &block);#{after_method};original_results;end;"
				end
			end
		end
	end
end

module RubyAi
	class Choice
		attr_accessor :options
		attr_reader :game
		
		include CallbackWrapper
		
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

		wrap_callbacks_around :user_chooses
	end
	class Game
		attr_reader :characters, :stages, :scenes
		
		include CallbackWrapper
		
		def initialize(input, output, target_script=nil)
			@settings = {
				:urls => {}
			}
			@characters = { }
			@stages = { }
			@sounds = { }
			@scenes = { }
			@input = input == nil ? Kernel : input
			@output = output == nil ? Kernel: output
			@target_script = target_script
		end
		
		def start(starting_scene=:intro)
			if @target_script
				script_dir = "scripts/#{@target_script}/"
				
				for_settings do
					eval File.read(script_dir + "settings.rb")
				end
				
				for_characters do
					eval File.read(script_dir + "characters.rb")
				end
				
				for_sounds do
					eval File.read(script_dir + "sounds.rb")
				end
				
				for_stages do
					eval File.read(script_dir + "stages.rb")
				end
				
				for_scenes do
					eval File.read(script_dir + "scenes.rb")
				end
			end
			
			within_start
			
			if @scenes[starting_scene]
				run_scene starting_scene 
			else
				raise "No such scene found: #{starting_scene}."
			end
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
		
		def speak(character, *statements)
			within_speak(character, *statements)
		end
		
		def action(character, *does_things)
			within_action(character, *does_things)
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
		
		def for_settings
			def for_urls
				def set(url_alias, url)
					@settings[:urls][url_alias] = url
				end
				
				yield if block_given?
			end
			
			yield if block_given?
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
		
		# A placeholder for consistency with the other for_* methods
		def for_scenes
			yield
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
		
		def show(element)
			show_element(element)
		end
		
		def show_element(element)
			within_show_element(element)
		end
		
		def hide(element)
			within_hide(element)
		end
		
		def sound(sound_element)
			within_sound(sound_element)
		end
		
		def command_with_context(element_alias, context, *statements)
			element = @characters[element_alias] or 
				@stages[element_alias] or 
				raise NoMethodError.new "Unrecognized character or stage \"#{element_alias}\" called with context \"#{context}\"."
			element.context = context
			
			self.send(element_alias, *statements)
		end
		
		def method_missing(method, *args, &block)
			unless method.to_s =~ /^(\w+)_(\w+)$/
				raise NoMethodError.new "No such method \"#{method}\".  Were you trying to show something in a context?"
			end
			
			context, element_name = $1, $2
			
			unless element_name
				raise NoMethodError.new "Tried to show a stage element in context \"#{context}\", but no element was found"
			end
			
			command_with_context(element_name.to_sym, context, *args)
		end
		
		# Strong text
		def st(string)
			within_st(string)
		end
		
		# Emphasized text
		def em(string)
			within_em(string)
		end
		
		# Show a URL
		def url(url_alias, description=nil)
			url = @settings[:urls][url_alias]
			
			raise Exception.new "No such URL in the settings: #{url_alias}" unless url
			
			within_url(url, description)
		end
		
		def code(string)
			within_code(string)
		end
		
		def code_block(string)
			within_code_block(string)
		end
		
		wrap_callbacks_around :start, :sound, :hide, :speak, :action, :show_element, :run_scene, :choice, :game_over, :narrate, :add_scene, :st, :em, :url, :code, :code_block
	end

	class GameWorkspace < DelegateClass(Game)
		instance_methods.each do |method|
			# TODO: Does this actually do anything useful or does DelegateClass render this 
			# implementation useless?
			# We might have to try a custom delegate setup wherein this class only delegates 
			# to *class* or *instance* methods of Game, thereby avoiding its inherited methods 
			# effectively
			undef_method method unless method.to_s =~ /method_missing|respond_to?|object_id|^__/
		end
		
		def initialize(game_environment)
			super(game_environment)
		end
		
		# Sandboxing goes here
	end
end
