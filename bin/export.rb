$LOAD_PATH << File.expand_path('../lib', __FILE__)
require 'lib/rubyai'

exporter_name = ARGV[0] or raise "Exporter name required"
require "lib/converters/#{exporter_name}" or raise "Missing or non-functional exporter: #{exporter_name}"

script_to_export = ARGV[1] or raise "Script to export required"

exporter = Exporter.new

game_environment = RubyAi::Game.new(exporter, exporter, script_to_export)
game = RubyAi::GameWorkspace.new(game_environment)

game.start

