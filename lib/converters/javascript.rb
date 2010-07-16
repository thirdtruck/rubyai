require 'highline/import'

class Exporter
	def initialize
		@js = File.open("web/js/script.js", "w")
	end
	
	def puts(string)
		indentation = "\t" * current_indentation
		@js.write(indentation + string+"\n")
		@js.write("\n")
	end
	
	def gets(query)
		@output.puts %^make_choice(current_choice);^;
	end
	
	def start_function
		@indent ||= 0
		puts " function() {"
		@indent = @indent + 1
	end

	def end_function
		@indent = @indent - 1
		puts " } "
	end

	def within_function
		start_function
		yield if block_given?
		end_function
	end

	def current_indentation
		@indent ||= 0
	end
end

module RubyAi
	class Game
		def before_start
			@output.puts %^renai_script = new RenAiScript(^ 
			@output.start_function
			@output.puts %^intro();^
		end
		
		def after_start
			@output.end_function
			@output.puts %^);^
		end
		
		def within_show_element(element)
			@output.puts %^show("#{element.name}");^
		end
		
		def within_show_image(element, image_name)
			@output.puts %^show("#{element.name}", "#{image_name.to_s}");^
		end
		
		def within_hide(element)
			@output.puts %^hide("#{element.name}");^
		end
		
		def within_sound(sound_element)
			@output.puts %^sound("#{sound_element.name}");^
		end
		
		def within_speak(character, statement)
			@output.puts %{speak("#{character.name}", "#{statement}");}
		end
		
		def within_action(character, does_thing)
			@output.puts %{action("#{character.name}", "#{does_thing}");}
		end
		
		def within_game_over(type=nil)
			case type
				when :success then @output.puts %^game_over("success");^
				when :failure then @output.puts %^game_over("failure");^
				else @output.puts %^game_over("neutral");^
			end
		end
		
		def within_add_scene(scene_alias, &block)
			@output.puts %^add_scene("#{scene_alias.to_s}",^
			@output.within_function &block
			@output.puts %^)^
                        #parse_script { @scenes[scene_alias].run }
		end
		
		def within_run_scene(scene_alias)
			@output.puts %^run_scene("#{scene_alias.to_s}");^
		end
		
		def within_narrate(*statements)
			statements.each do | statement |
				@output.puts %^narrate("#{statement}");^
			end
		end
		
		def within_choice(choice_obj)
			@output.puts %^current_choice = new Choice;^
			
			choice_obj.options.each do |option_obj|
				@output.puts %^add_option_to_choice(current_choice, "#{option_obj.description}",^
				@output.within_function { option_obj.block.call }
				@output.puts %^);^
			end
		end
	end
	
	class Sound < StageElement
		def show_as
			"*#{@name}*"
		end
	end
end
