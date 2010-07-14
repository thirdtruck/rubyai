require 'highline/import'

class InteractiveInterface
	def puts(string)
		Kernel.print(string)
		ask(''){ |q| q.echo = '' }
		Kernel.puts()
	end
	def gets(query)
		query = query + " " if query !~ /\s$/
		answer = ask(query) { |q| q.echo = true }
		Kernel.puts()
		answer
	end
end

module RubyAi
	class Game
		def before_start
			@output.puts "Welcome to Ruby'Ai!"
			answer = @input.gets "Begin? [y/n]:"
		end
		
		def within_show_element(element)
			@output.puts element.show_as
		end
		
		def within_show_image(element, image_name)
			@output.puts "[#{element.name} #{image_name.to_s}]"
		end
		
		def within_hide(element)
			@output.puts "[Hide #{element.name}]"
		end
		
		def within_sound(sound_element)
			@output.puts sound_element.show_as
		end
		
		def within_speak(character, statement)
			@output.puts "#{character.name}: #{statement}"
		end
		
		def within_action(character, does_thing)
			@output.puts "#{character.name} #{does_thing}"
		end
		
		def game_over(type=nil)
			@output.puts "Game Over!"
			case type
				when :success then @output.puts "You win!"
				when :failure then @output.puts "You lose!"
				else @output.puts "Please play again!"
			end
		end
		
		def narrate(*statements)
			statements.each do | statement |
				@output.puts statement	
			end
		end
	end
	
	class Sound < StageElement
		def show_as
			"*#{@name}*"
		end
	end
	
	class Choice
		def to_s
			if not @stringified
				@stringified = ""
				total_questions = 0
				@options.each do |option|
					@stringified << "[#{total_questions+1}] #{option.description}\n"
					total_questions = total_questions + 1
				end
				
				@stringified << "Choose one [1#{total_questions > 1 ? "-"+total_questions.to_s : ""}]:"
			end
			@stringified
		end
	end
end
