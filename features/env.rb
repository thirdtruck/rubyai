$LOAD_PATH << File.expand_path('../../lib', __FILE__)
require 'lib/rubyai'
require 'lib/converters/interactive_fiction'

class PassiveInterface
  def initialize
    @incoming_messages = []
    @outgoing_messages = []
  end
  
  def add_message(message)
    @incoming_messages.push(message)
  end
  
  def messages
    @outgoing_messages
  end
  
  def gets(prompt=nil)
    self.puts(prompt)
    @incoming_messages.pop
  end
  
  def puts(message)
    message.to_s.split("\n").each do |line|
      @outgoing_messages.push(line)
    end
  end
end

def interface
	@interface ||= PassiveInterface.new
end

def output
  @output ||= interface
end

def input
  @input ||= interface
end

def game
  if @game
    @game
  else
    game_environment = RubyAi::Game.new(input, output)
    @game = RubyAi::GameWorkspace.new(game_environment)
  end
end
