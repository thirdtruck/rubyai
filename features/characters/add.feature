Feature: add characters
	
	As a Ruby'Ai Writer
	I want to add characters
	So that I can include them in my game
	
	Scenario: add a character
		Given an empty script
		When I add a character named "Lucy"
		Then calling `lucy` should return that character
