module RubyAi
	class Game
		attr_reader :characters, :scenes
		def initialize(output)
			@characters = { }
			@scenes = { }
			@output = output
		end
		
		def start
			@output.puts "Welcome to Ruby'Ai!"
			@output.puts "Begin? [y/n]"
		end
		
		def parse_script(&block)
			def speak(character, *args)
				"#{character}: #{args[0]}"
			end
			def action(character, *args)
				"#{character} #{args[0]}"
			end
			
			def says(*args)
				args.push(:statement)
			end
			def thusly(*args)
				args.push(:action)
			end
			
			def method_missing(method, *args)
				statement_or_action = nil
				
				if args[-1] == :statement
					statement_or_action = :statement
				elsif args[-1] == :action
					statement_or_action = :action
				elsif args[0] =~ /^[:lower]/
					statement_or_action = :action
				else
					statement_or_action = :statement
				end
				
				character = @characters[method]
				if not character
					raise NoMethodError.new "No such character: #{method}"
				end
				
				if statement_or_action == :statement
					speak(character, args[0])
				elsif statement_or_action == :action
					action(character, args[0])
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
		
		def add_scene(scene_alias, &block)
			@scenes[scene_alias] = block
		end
	end
end
