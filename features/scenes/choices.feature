Feature: make choices
	
	As a Ruby'Ai Player
	I want an interactive game
	So that it is all the more engaging
	
	Scenario: single numerical choice
		Given an :intro scene
		When I add `choice do option "Continue forward" do narrate "You went forward!" end end` to scene :intro
		And I run scene :intro
		Then I should see "[1] Continue forward"
		And I should see "Choose one [1]: "
	
	Scenario: choose from a single numerical choice
		Given an :intro scene
		When I add `choice do option "Continue forward" do narrate "You went forward!" end end` to scene :intro
		And I choose option "1"
		And I run scene :intro
		Then I should see "[1] Continue forward"
		And I should see "Choose one [1]: "
		And I should see "You went forward!"
	
	Scenario: choose from a single numerical choice that uses interpolation
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `choice do option "Email #{lucy}" do narrate "You sent a message to #{lucy}!" end end` to scene :intro
		And I choose option "1"
		And I run scene :intro
		Then I should see "[1] Email Lucy"
		And I should see "Choose one [1]: "
		And I should see "You sent a message to Lucy!"
