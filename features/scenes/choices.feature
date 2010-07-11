Feature: make choices
	
	As a Ruby'Ai Player
	I want an interactive game
	So that it is all the more engaging
	
	Scenario: single numerical choice
		Given an :intro scene
		When I add `choice do option "Continue forward" do narrate "You went forward!" end end` to scene :intro
		And I run scene :intro
		Then I should see "[1] Continue forward"
	
	Scenario: choose from a single numerical choice
		Given an :intro scene
		When I add `choice do option "Continue forward" do narrate "You went forward!" end end` to scene :intro
		And I choose option "1"
		And I run scene :intro
		Then I should see "[1] Continue forward"
		And I should see "You went forward!"
