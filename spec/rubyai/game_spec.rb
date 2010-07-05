require 'spec/spec_helper'

module RubyAi
	describe Game do
		describe "#start" do
			it "sends a welcome message" do
				output = double(:output).as_null_object
				
				game = Game.new(output)
				
				output.should_receive(:puts).with("Welcome to Ruby'Ai!")
				
				game.start
			end
			
			it "prompts for the game start" do
				output = double(:output).as_null_object
				
				game = Game.new(output)
				
				output.should_receive(:puts).with("Begin? [y/n]")
				
				game.start
			end
		end
	end
end
