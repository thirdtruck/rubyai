require 'fileutils'
include FileUtils

def log(statement)
	@log_messages ||= []
	@log_messages << statement
	Kernel.puts "Log: " + statement
end

def log_once(statement)
	@log_messages ||= []
	log(statement) unless @log_messages.include? statement
end

# Javascript-escaping implemention borrowed from Ruby on Rails's JavaScriptHelper
JS_ESCAPE_MAP = { '\\' => '\\\\', '</' => '<\/', "\r\n" => '\n', "\n" => '\n', "\r" =>  '\n', '"' => '\\"', "'" => "\\'" }

def start_command_wrapper(type="command")
	%^{ type : "#{type}", content : function (){ ^
end

def end_command_wrapper
	%^ } },^
end

def command_wrapper(string)
	start_command_wrapper + string + end_command_wrapper
end

def escape_js_no_quotes(string)
	string = string.to_s
	string.gsub(/(['"])/) { JS_ESCAPE_MAP[$1] }
end

def escape_js(string)
	escaped_string = escape_js_no_quotes(string)
	%^"#{escaped_string}"^
end

class Exporter
	def self.description
		"Exports a web-based version that runs via Javascript.  Requires images."
	end

	def initialize
		destination_dir = "web"
		destination_file = destination_dir + "/js/script.js"
		log "Exporting files to \"#{destination_dir}\"..."
		log "Open \"#{destination_dir}/index.html\" in your browser to view the results."
		@js = File.open(destination_file, "w")
	end

	def puts(string)
		indentation = "\t" * current_indentation
		@js.write(indentation + string+"\n")
		@js.write("\n")
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

	def within_function(contents="")
		start_function
		indentation = "\t" * current_indentation
		@js.write(indentation + contents + "\n")
		yield if block_given?
		end_function
	end

	def indent_more
		@indent += 1
	end
	
	def indent_less
		@indent -= 1
		if @indent < 0
			@indent = 0
		end
	end
	
	def current_indentation
		@indent ||= 0
	end
end

module RubyAi
	class Game
		def before_start
			@output.puts %^var rubyai_game = new RubyAiGame(^ 
			@output.start_function
		end
		
		def after_start
			@output.end_function
			@output.puts %^);^
			#@output.puts %^rubyai_game.start( { scene: "intro" } );^
		end
		
		def within_show_element(element)
			image_url = get_image_url(element, element.context)
			@output.puts element.show_function(image_url)
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
			@output.puts command_wrapper %^rubyai_game.hide(#{escape_js element.name});^
		end
		
		def within_sound(sound_element)
			@output.puts command_wrapper %^rubyai_game.sound(#{escape_js sound_element.alias}, #{escape_js sound_element.name});^
		end
		
		def within_speak(character, statement)
			image_url = get_image_url(character, character.context)
			@output.puts command_wrapper %^rubyai_game.speak(#{escape_js character.name}, #{escape_js statement}, #{escape_js image_url});^
		end
		
		def within_action(character, does_thing)
			image_url = get_image_url(character, character.context)
			@output.puts command_wrapper %^rubyai_game.action(#{escape_js  character.name}, #{escape_js does_thing}, #{escape_js image_url});^
		end
		
		def within_start(starting_scene)
		end
		
		def within_game_over(type=:neutral)
			@output.puts command_wrapper %^rubyai_game.gameOver("#{type}");^
		end
		
		def within_add_scene(scene_alias)
			@output.puts %^this.addScene(#{escape_js scene_alias.to_s}, [^
			@output.indent_more
			yield
			@output.indent_less
			@output.puts %^] );^
		end
		
		def within_run_scene(scene_alias)
			@output.puts command_wrapper %^rubyai_game.runScene(#{escape_js scene_alias.to_s});^
		end
		
		def within_narrate(*statements)
			statements.each do | statement |
				@output.puts command_wrapper %^rubyai_game.narrate(#{escape_js statement});^
			end
		end
		
		def within_choice(choice_obj)
			@output.puts start_command_wrapper("choice") + %^rubyai_game.choice( [^
			
			choice_obj.options.each do |option_obj|
				@output.indent_more
				@output.puts %^new Option(#{escape_js option_obj.description}, [^
				@output.indent_more
				option_obj.block.call
				@output.indent_less
				@output.puts %^] ),^
				@output.indent_less
			end
			
			@output.puts %^] )^ + end_command_wrapper
		end
		
		def within_st(string)
			%^<strong>#{string}</strong>^
		end
		
		def within_em(string)
			%^<em>#{string}</em>^
		end
		
		def within_url(url, description=nil)
			if description
				%^<a href="#{url}" target="_blank">#{description}</a>^
			else
				%^[<a href="#{url}" target="_blank">#{url}</a>]^
			end
		end
		
		def within_code(string)
			%^<span class="code">#{string}</span>^
		end
		
		def within_code_block(string)
			clean_string = string.gsub(/[\n\r]+/, '\\n');
			clean_string.gsub!(/"/, "&quot;");
			@output.puts command_wrapper %^rubyai_game.codeBlock(#{escape_js clean_string})^
		end
		
		def within_get_var(variable_name)
			this.vars.send(variable_name.to_sym)
		end
		
		def within_embed_var(variable_name)
			%^%%[variable: #{variable_name}]%%^
		end
	end
end

class NovelElement
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
		command_wrapper "rubyai_game.show#{self.type.capitalize}(#{escape_js @alias}, #{escape_js @name}, #{escape_js image_url}, #{escape_js @description});"
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

class Sound
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
