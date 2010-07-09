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
	class Game
		attr_reader :characters, :stages, :scenes
		def initialize(output)
			@characters = { }
			@stages = { }
			@sounds = { }
			@scenes = { }
			@output = output
		end
		
		def start
			@output.puts "Welcome to Ruby'Ai!"
			@output.puts "Begin? [y/n]:"
		end
		
		def parse_script(&block)
			def narrate(statement)
				@output.puts statement	
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
			
			def method_missing(method, *args)
				command = args[0]
				
				if command.respond_to? :command_type
					# it's already a command
				elsif command =~ /^[a-z]/
					thusly(command)
				else
					says(command)
				end
				
				character = @characters[method]
				stage = @stages[method]
				sound = @sounds[method]
				
				if character	
					if command.command_type == :statement
						@output.puts speak(character, command)
					elsif command.command_type == :action
						@output.puts action(character, command)
					else
						raise NoMethodError.new "No such method: #{method} for character #{character.name}"
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
			def sound(sound_element)
				@output.puts sound_element.show_as
			end
			
			@scenes[scene_alias].run
		end
	end
end
