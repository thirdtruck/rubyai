#!/usr/bin/ruby1.9
$LOAD_PATH << File.expand_path('../lib', __FILE__)
require 'optparse'
require 'ostruct'
require 'lib/rubyai'

@usage = "Usage: export.rb [options] <exporter> <script>\nExample: export.rb interactive_fiction tutorial"

def fail_with(message)
	puts @usage
	puts
	puts message
	puts
	show_known_exporters
	exit
end

def show_known_exporters
	puts "Known exporters:"
	known_exporters.each do |exporter|
		puts "\t#{exporter.name} - #{exporter.description}"
	end
end

def known_exporters
	exporter_list = []
	converters_dir = Dir.new('lib/converters')
	converters_dir.each do |filename|
		if filename =~ /^([\w-]*)\.rb$/
			if require "lib/converters/#{filename}"
				exporter_metainfo = OpenStruct.new
				exporter_metainfo.name = $1
				exporter_metainfo.description = Exporter.description
				exporter_list << exporter_metainfo
			end
		end
	end
	exporter_list
end

options = { }

option_parser = OptionParser.new do |opts|
	opts.banner = @usage
	
	opts.on( '-h', '--help', "Display this screen" ) do
		puts opts
		exit
	end
	
	opts.on( '--exporters', "List known exporters" ) do
		show_known_exporters
		exit
	end
end

option_parser.parse!

exporter_name = ARGV[0] or fail_with "Exporter name required"
require "lib/converters/#{exporter_name}" or fail_with "Missing or non-functional exporter: #{exporter_name}"

script_to_export = ARGV[1] or fail_with "Script to export required"

exporter = Exporter.new

game_environment = RubyAi::Game.new(exporter, exporter, script_to_export)
game = RubyAi::GameWorkspace.new(game_environment)

game.start

