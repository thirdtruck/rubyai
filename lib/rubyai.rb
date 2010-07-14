# Required just for the text-based interface
require 'rubygems'
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
	class StageElement
		attr_reader :name, :description
		
		def initialize(name, description="")
			@name = name
			@description = description
		end
		
		def to_s
			@name
		end
	end
	
	class Character < StageElement
	end
	
	class Stage < StageElement
	end
	
	class Sound < StageElement
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
			@game.send(method, *args, &block)
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
			
			total_questions = 0
			@options.each do |option|
				@stringified << "[#{total_questions+1}] #{option.description}\n"
				total_questions = total_questions + 1
			end
			
			@stringified << "Choose one [1#{total_questions > 1 ? "-"+total_questions.to_s : ""}]:"
		end
		
		def to_s
			@stringified
		end
		
		def user_chooses(choice)
			# TODO: make this require a valid option; *.to_i automatically defaults to zero and so supplies an inadvertent default of the final choice.
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
			@input = input == nil ? InteractiveInterface.new : input
			@output = output == nil ? InteractiveInterface.new : output
			@source_file = source_filename ? File.open(source_filename).read : nil
		end
		
		def start
			@output.puts "Welcome to Ruby'Ai!"
			answer = @input.gets "Begin? [y/n]:"
			eval(@source_file) if @source_file
		end
		
		def game_over(type=nil)
			@output.puts "Game Over!"
			case type
				when :success then @output.puts "You win!"
				when :failure then @output.puts "You lose!"
				else @output.puts "Please play again!"
			end
		end
		def choice(&block)
			current_choice = Choice.new(self, &block)
			choice_made = @input.gets(current_choice.to_s)
			result = current_choice.user_chooses(choice_made)
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
		
		def parse_script(&block)
			instance_eval(&block) if block_given?
		end
		
		def dynamic_character(character_alias, *commands)
			character = @characters[character_alias]
			commands.each do |command|
				if command.respond_to? :command_type
					# it's already a command
				elsif command =~ /^[a-z]/
					thusly(command)
				else
					says(command)
				end
			end
			
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
		end
		
		def for_characters
			def add(character_alias, character_name)
				@characters[character_alias] = Character.new(character_name)
				
				self.class.class_eval do
					eval "def #{character_alias.to_s}(*commands); dynamic_character(:#{character_alias.to_s}, *commands); end"
				end
			end
			
			yield if block_given?
		end
		
		def dynamic_sound(sound_id)
			sound = @sounds[sound_id]
			
			return sound
		end
		
		def for_sounds
			def add(sound_id, sound_name)
				@sounds[sound_id] = Sound.new(sound_name)
				
				self.class.class_eval do
					eval "def #{sound_id.to_s}(*commands); dynamic_sound(:#{sound_id.to_s}, *commands); end"
				end
			end
			
			yield if block_given?
		end
		
		def dynamic_stage(stage_alias, *commands)
			stage = @stages[stage_alias]
			@output.puts stage.description
			return stage
		end
		
		def for_stages
			def add(stage_alias, stage_name)
				@current_description = ""
				
				def describe_as(new_description)
					@current_description = new_description
				end
				
				yield if block_given?
				
				@stages[stage_alias] = Stage.new(stage_name, @current_description)
				
				self.class.class_eval do
					eval "def #{stage_alias.to_s}(*commands); dynamic_stage(:#{stage_alias.to_s}, *commands); end"
				end
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
