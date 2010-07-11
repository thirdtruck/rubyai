module RubyAi
	class Character
		attr_reader :name
		
		def initialize(name)
			@name =  name
		end
		
		def to_s
			@name
		end
	end
	class Stage
		attr_reader :name, :description
		
		def initialize(name, description="")
			@name = name
			@description = description
		end
	end
	class Sound
		attr_reader :name, :description
		
		def initialize(name, description="")
			@name = name
			@description = description || name
		end
		
		def show_as
			"*#{@name}*"
		end
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
		class Option
			attr_accessor :description, :block
			
			def initialize(description, &block)
				@description = description
				@block = block
			end
		end
		
		def method_missing(method, *args, &block)
			@game.send(method, args, block)
		end
		
		attr_accessor :options
		attr_reader :game
		
		def option(description, &block)
			@options << Option.new(description, &block)
		end
		
		def initialize(game, &block)
			@game = game
			@options = []
			@stringified = ""
			instance_eval(&block) if block
			
			option_index = 1
			@options.each do |option|
				@stringified << "[#{option_index}] #{option.description}\n"
				option_index = option_index + 1
			end
			
			@stringified << "Choose one [1#{option_index-1 > 1 ? "-"+option_index.to_s : ""}]: "
		end
		
		def to_s
			@stringified
		end
		
		def user_chooses(choice)
			@options[choice.to_i-1].block
		end
	end
	class Game
		attr_reader :characters, :stages, :scenes
		def initialize(input, output, source_filename=nil)
			@characters = { }
			@stages = { }
			@sounds = { }
			@scenes = { }
			@output = output
			@input = input
			@source_file = source_filename ? File.open(source_filename).read : nil
		end
		
		def start
			@output.puts "Welcome to Ruby'Ai!"
			@output.puts "Begin? [y/n]:"
			eval(@source_file) if @source_file
		end
		
		def parse_script(&block)
			def choice(&block)
				current_choice = Choice.new(self, &block)
				@output.puts current_choice
				result = current_choice.user_chooses(@input.gets)
				instance_eval &result
			end
			def narrate(*statements)
				statements.each do | statement |
					@output.puts statement	
				end
			end
			
			def speak(character, statement)
				"#{character.name}: #{statement}"
			end
			
			def action(character, does_thing)
				"#{character.name} #{does_thing}"
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
			
			def method_missing(method, *commands)
				commands.each do |command|
					if command.respond_to? :command_type
						# it's already a command
					elsif command =~ /^[a-z]/
						thusly(command)
					else
						says(command)
					end
				end
				
				character = @characters[method]
				stage = @stages[method]
				sound = @sounds[method]
				
				if character	
					commands.each do |command|
						if command.command_type == :statement
							@output.puts speak(character, command)
						elsif command.command_type == :action
							@output.puts action(character, command)
						else
							raise NoMethodError.new "No such method: #{method} for character #{character.name}"
						end
					end
					return character
				elsif stage
					@output.puts stage.description
					return stage
				elsif sound
					return sound
				else
					raise NoMethodError.new "No such character or stage: #{method}"
				end
			end
			instance_eval(&block) if block_given?
		end
		
		def for_characters
			def add(character_alias, character_name)
				@characters[character_alias] = Character.new(character_name)
			end
			
			yield if block_given?
		end
		
		def for_sounds
			def add(sound_id, sound_name)
				@sounds[sound_id] = Sound.new(sound_name)
			end
			
			yield if block_given?
		end
		
		def for_stages
			def add(stage_alias, stage_name)
				@current_description = ""
				
				def describe_as(new_description)
					@current_description = new_description
				end
				
				yield if block_given?
				
				@stages[stage_alias] = Stage.new(stage_name, @current_description)
			end
			
			yield if block_given?
		end
		
		def add_scene(scene_alias, &block)
			@scenes[scene_alias] = Scene.new(&block)
		end
		
		def run_scene(scene_alias)
			def show(element, image_name=nil)
				case
					when image_name then @output.puts "[#{element.name} #{image_name.to_s}]"
					when element.respond_to?(:show_as)then @output.puts element.show_as
					when @stages[element] then @output.puts @stages[element].description
				end
			end
			def hide(element)
				@output.puts "[Hide #{element.name}]"
			end
			def sound(sound_element)
				@output.puts sound_element.show_as
			end
			
			parse_script { @scenes[scene_alias].run }
		end
	end
end
