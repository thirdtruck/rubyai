require 'lib/rubyai'
require 'lib/converters/interactive_fiction'

interface = InteractiveInterface.new
game_environment = RubyAi::Game.new(interface, interface, "tutorial")
game = RubyAi::GameWorkspace.new(game_environment)

game.start

