module RubyAi
	class Stage
		attr_reader :name, :description
		
		def initialize(name, description="")
			@name = name
			@description = description
		end
	end
	class Game
		attr_reader :characters, :stages, :scenes
		def initialize(output)
			@characters = { }
			@stages = { }
			@scenes = { }
			@output = output
		end
		
		def start
			@output.puts "Welcome to Ruby'Ai!"
			@output.puts "Begin? [y/n]:"
		end
		
		def parse_script(&block)
			def speak(character, statement)
				"#{character}: #{statement}"
			end
			def action(character, does_thing)
				"#{character} #{does_thing}"
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
				if not character
					raise NoMethodError.new "No such character: #{method}"
				end
				
				if command.command_type == :statement
					@output.puts speak(character, command)
				elsif command.command_type == :action
					@output.puts action(character, command)
				else
					raise NoMethodError.new "No such method: #{method} for character #{character}"
				end
			end
			instance_eval(&block) if block_given?
		end
		
		def for_characters
			def add(character_alias, character_name)
				@characters[character_alias] = character_name
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
			@scenes[scene_alias] = block
		end
	end
end
