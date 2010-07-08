Feature: add characters
	
	As a Ruby'Ai Writer
	I want to add characters
	So that I can include them in my game
	
	Scenario: add a character
		Given an empty script
		When I add a :lucy character named "Lucy"
		Then the list of characters should include :lucy

	Scenario: add a pseudonym for a character
		Given an empty script
		When I add a :lucy character named "Lucy"
		When I give them a pseudonym of :hidden_voice with name "Hidden Voice"
		Then the character :hidden_voice should be the same as :lucy

