require 'lib/rubyai'
require 'lib/converters/interactive_fiction'

interface = InteractiveInterface.new
game = RubyAi::Game.new(interface, interface, "scripts/tutorial.rb")

game.start

