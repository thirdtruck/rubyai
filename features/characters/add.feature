Feature: add characters
	
	As a Ruby'Ai Writer
	I want to add characters
	So that I can include them in my game
	
	Scenario: add a character
		Given an empty script
		When I add a :lucy character named "Lucy"
		Then the list of characters should include :lucy

	# Ignoring this feature for now
	# TODO: Consider adding this feature back in when it offers a real benefit beyond 
	# just add a new character
	Scenario: add a pseudonym for a character
		Given an empty script
		When I add a :lucy character named "Lucy"
		When I give them a pseudonym of :hidden_voice named "Hidden Voice"
		Then the character :hidden_voice should be the same as :lucy

