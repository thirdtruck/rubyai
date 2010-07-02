Feature: rubyai starts game

	As a Ruby'Ai Player
	I want to start a game
	So that I can play the game
	
	Scenario: start game
		Given I am not yet playing
		When I start a game
		Then I should see "Welcome to Ruby'Ai!"
		And I should see "Begin? [y/n]:"
	
