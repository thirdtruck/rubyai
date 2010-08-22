#!/usr/bin/ruby1.8
$LOAD_PATH << File.expand_path('lib', __FILE__)
require 'lib/rubyai'
require 'lib/converters/interactive_fiction'

script_to_run = ARGV[0] or raise "Usage: ./test_run.rb <script_name>\nExample: ./test_run.rb tutorial"
starting_scene = (ARGV[1] or :intro)

interface = InteractiveInterface.new
game = RubyAi::Game.new(interface, interface, script_to_run)

game.start(starting_scene.to_sym)
