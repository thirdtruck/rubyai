class RubyAi
	def initialize
		@characters = { }
	end
	
	def parse_script(&block)
		instance_eval(&block) if block_given?
	end
	
	def for_characters
		def add(character_alias, character_name)
			eval %{
				def self.#{character_alias}(text)
					\"#{character_name}: \#{text\}\"
				end
			}
		end
		
		yield if block_given?
	end
end
