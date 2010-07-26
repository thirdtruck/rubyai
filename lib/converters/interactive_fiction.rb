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
		
		def after_start
		end
		
		def within_show_element(element)
			@output.puts element.show_as
		end
		
		def within_hide(element)
			@output.puts "[Hide #{element.name}]"
		end
		
		def within_sound(sound_element)
			@output.puts sound_element.show_as
		end
		
		def within_speak(character, statement)
			context = case character.context
				when :default then ""
				else "[#{character.context.to_s.capitalize}] "
			end
			@output.puts "#{context}#{character.name}: #{statement}"
		end
		
		def within_action(character, does_thing)
			context = case character.context
				when :default then ""
				else "[#{character.context.to_s.capitalize}] "
			end
			@output.puts "#{context}#{character.name} #{does_thing}"
		end
		
		def within_game_over(type=nil)
			@output.puts "Game Over!"
			case type
				when :success then @output.puts "You win!"
				when :failure then @output.puts "You lose!"
				else @output.puts "Please play again!"
			end
		end
		
		def within_narrate(*statements)
			statements.each do | statement |
				@output.puts statement	
			end
		end
		
		def within_choice(choice_obj)
			choices_as_text = ""
			option_index = 1
			choice_obj.options.each do |option_obj|
				choices_as_text << "[#{option_index}] #{option_obj.description}\n"
				option_index = option_index + 1
			end
			choices_as_text << "Choose one [1#{choice_obj.options.size > 1 ? "-"+choice_obj.options.size.to_s : ""}]:"
			choice_made = @input.gets(choices_as_text)
			
			result = choice_obj.user_chooses(choice_made)
			instance_eval &result
		end
		
		def within_run_scene(scene_alias)
                        parse_script { @scenes[scene_alias].run }
		end
		
		def within_st(string)
			"*#{string}*"
		end
		
		def within_em(string)
			"/#{string}/"
		end
		
		def within_url(url, description=nil)
			if description
				"#{description} [#{url}]"
			else
				"[#{url}]"
			end
		end
		
		def within_code(string)
			"`#{string}`"
		end
	end
	

        class Character < StageElement
                def show_as
                        if @context == :default
                                "[Show #{@name}]"
                        else
                                "[#{@name} #{@context}]"
                        end
                end
        end
	
	class Sound < StageElement
		def show_as
			"*#{@name}*"
		end
	end
end
