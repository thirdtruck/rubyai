$LOAD_PATH << File.expand_path('../../lib', __FILE__)
require 'spec'
require 'lib/rubyai'

class Output
  def initialize
    @messages = []
  end
  
  def messages
    @messages ||= []
  end
  
  def puts(message)
    @messages << message
  end
end

def output
  @output ||= Output.new
end

def game
  @game ||= RubyAi::Game.new(output)
end
