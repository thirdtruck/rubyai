require 'spec/spec_helper'

module RubyAi
	describe Game do
		describe "#start" do
			it "sends a welcome message" do
				output = double(:output).as_null_object
				output.should_receive(:puts).with("Welcome to Ruby'Ai!")
				
				game = Game.new(output)
			end
			
			it "prompts for the game start"
		end
	end
end
