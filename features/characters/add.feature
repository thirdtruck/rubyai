Feature: add characters
	
	As a Ruby'Ai Writer
	I want to add characters
	So that I can include them in my game
	
	Scenario: add a character
		Given an empty script
		When I add a character named "Lucy"
		Then the list of characters should include "Lucy"

	Scenario: add an alias for a character
		Given an empty script
		And a character named "Lucy"
		When I give them an alias of "Hidden Voice"
		Then the character "Hidden Voice" should be the same as "Lucy"

