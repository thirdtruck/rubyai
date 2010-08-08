class NovelElement
	attr_reader :alias, :name, :description
	attr_accessor :context
	
	def initialize(element_alias, name, description="")
		@alias = element_alias
		@name = name
		@description = description
		@context = :default
	end
	
	# TODO: to_s and show_as can probably be replaced with a single, more explicit method.  to_s should probably *not* be this method.
	def to_s
		@name
	end
	
	def show_as
		puts "Inner call!"
	end
end

class Character < NovelElement
end

class Stage < NovelElement
	def show_as
		@description
	end
end

class Sound < NovelElement
end

