require 'highline/import'
require 'lib/novel_elements'

module InteractiveInterfaceCommands
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

class InteractiveInterface
	include InteractiveInterfaceCommands
end

class Character
	def show_as
		if @context == :default
			"[Show #{@name}]"
		else
			"[#{@name} #{@context}]"
		end
	end
end

class Sound
	def show_as
		"*#{@name}*"
	end
end

module RubyAi
	class Game
		def before_start
			@output.puts "Welcome to Ruby'Ai!"
			answer = @input.gets "Begin? [y/n]:"
		end
		
		def within_start(starting_scene)
			if @scenes[starting_scene]
				run_scene starting_scene 
			else
				raise "No such scene found: #{starting_scene}."
			end
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
		
		def within_code_block(string)
			# TODO: Find the more concise way of trimming this
			if string[0] == "\n"
				trimmed_string = string[1..-1]
			else
				trimmed_string = string
			end
			if string[-1] == "\n"
				trimmed_string = trimmed_string[0..-2]
			end
			@output.puts "CODE>>>\n#{trimmed_string}\n<<<CODE"
		end
		
		def within_compare_var(variable_alias, &block)
			# TODO: Move these instance variables into a single object, or set up a special module to handle all these states
			@compare_to = variable_alias
			@default = nil
			@ran_any = false
			instance_eval &block
			unless @ran_any
				puts @default
				instance_eval &@default if @default != nil
			end
			@compare_to = nil
		end
		
		def within_on(value, &block)
			if(@compare_to != nil and get_var(@compare_to) == value)
				instance_eval &block
				@ran_any = true
			end
		end
		
		def within_default(&block)
			@default = block
		end
	end
end

class Exporter
	include InteractiveInterfaceCommands
	
	def self.description
		"Runs the script directly with a plain-text, command-line interface."
	end
	
	def initialize(options={})
		super(options)
	end
end
