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
