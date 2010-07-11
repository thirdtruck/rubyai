$LOAD_PATH << File.expand_path('../../lib', __FILE__)
require 'spec'
require 'lib/rubyai'

class Input
  def initialize
    @messages = []
  end
  
  def add_message(message)
    @messages.push(message)
  end
  
  def gets
    @messages.pop
  end
end

class Output
  def initialize
    @messages = []
  end
  
  def messages
    @messages ||= []
  end
  
  def puts(message)
    message.to_s.split("\n").each do |line|
      @messages << line
    end
  end
end

def output
  @output ||= Output.new
end

def input
  @input ||= Input.new
end

def game
  @game ||= RubyAi::Game.new(input, output)
end
