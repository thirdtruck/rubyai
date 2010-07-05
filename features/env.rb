$LOAD_PATH << File.expand_path('../../lib', __FILE__)
require 'spec'
require 'lib/RubyAi'

class Output
  attr_reader :messages
  
  def initialize
    @messages = []
  end
  
  def puts(message)
    @messages << message
  end
end

def output
  output ||= Output.new
end

