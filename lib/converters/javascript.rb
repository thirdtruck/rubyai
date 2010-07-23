require 'fileutils'
include FileUtils

def log(statement)
	@log_messages ||= []
	@log_messages << statement
	puts "Log: " + statement
end

def log_once(statement)
	@log_messages ||= []
	log(statement) unless @log_messages.include? statement
end

# Javascript-escaping implemention borrowed from Ruby on Rails's JavaScriptHelper
JS_ESCAPE_MAP = { '\\' => '\\\\', '</' => '<\/', "\r\n" => '\n', "\n" => '\n', "\r" =>  '\n', '"' => '\\"', "'" => "\\'" }

def escape_js_no_quotes(string)
	string = string.to_s
	string.gsub(/(['"])/) { JS_ESCAPE_MAP[$1] }
end

def escape_js(string)
	escaped_string = escape_js_no_quotes(string)
	%^"#{escaped_string}"^
end

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
			@output.puts %^rubyai_script = new RubyAiScript(^ 
			@output.start_function
			@output.puts %^intro();^
		end
		
		def after_start
			@output.end_function
			@output.puts %^);^
		end
		
		def within_show_element(element)
			image_url = get_image_url(element, element.context)
			@output.puts element.show_function(image_url)
			#@output.puts %^show(#{escape_js element.name}, #{escape_js image_url});^
		end
		
		def get_image_url(element, image_name)
			default_image_source = "media/#{element.type_plural}/#{element.alias}.png"
			specific_image_source = "media/#{element.type_plural}/#{element.alias}_#{image_name}.png"
			image_url = "#{element.resource_url}_#{image_name}.png"
			if(FileTest.exists? specific_image_source)
				cp(specific_image_source, "web/"+image_url)
			else
				log_once("Image missing: #{specific_image_source}.  Using default.")
				cp(default_image_source, "web/"+image_url)
			end
			image_url
		end
		
		def within_hide(element)
			@output.puts %^hide(#{escape_js element.name});^
		end
		
		def within_sound(sound_element)
			@output.puts %^sound(#{escape_js sound_element.name});^
		end
		
		def within_speak(character, statement)
			image_url = get_image_url(character, character.context)
			@output.puts %{speak(#{escape_js character.name}, #{escape_js statement}, #{escape_js image_url});}
		end
		
		def within_action(character, does_thing)
			image_url = get_image_url(character, character.context)
			@output.puts %{action(#{escape_js  character.name}, #{escape_js does_thing}, #{escape_js image_url});}
		end
		
		def within_game_over(type=nil)
			case type
				when :success then @output.puts %^game_over("success");^
				when :failure then @output.puts %^game_over("failure");^
				else @output.puts %^game_over("neutral");^
			end
		end
		
		def within_add_scene(scene_alias, &block)
			@output.puts %^add_scene(#{escape_js scene_alias.to_s},^
			@output.within_function &block
			@output.puts %^)^
                        #parse_script { @scenes[scene_alias].run }
		end
		
		def within_run_scene(scene_alias)
			@output.puts %^run_scene(#{escape_js scene_alias.to_s});^
		end
		
		def within_narrate(*statements)
			statements.each do | statement |
				@output.puts %^narrate(#{escape_js statement});^
			end
		end
		
		def within_choice(choice_obj)
			@output.puts %^choose_from( new Choice( [^
			
			choice_obj.options.each do |option_obj|
				@output.puts %^new Option(#{escape_js option_obj.description},^
				@output.within_function { option_obj.block.call }
				@output.puts %^),^
			end
			
			@output.puts %^] ) );^
		end
	end
	
	class StageElement
		def resource_url
			"images/misc/#{@alias}"
		end
		
		def type
			"misc"
		end
		
		def type_plural
			if self.type != "misc"
				self.type + "s"
			else
				self.type
			end
		end
		
		def show_function(image_url)
			"show_#{self.type}(#{escape_js @alias}, #{escape_js @name}, #{escape_js image_url}, #{escape_js @description});"
		end
	end
	
	class Character
		def resource_url
			"images/characters/#{@alias}"
		end
		
		def type
			"character"
		end
	end
	
	class Stage
		def resource_url
			"images/stages/#{@alias}"
		end
		
		def type
			"stage"
		end
	end
	
	class << Sound
		def resource_url
			"sounds/#{@alias}"
		end
		
		def show_as
			"*#{@name}*"
		end
		
		def type
			"sound"
		end
	end
end
