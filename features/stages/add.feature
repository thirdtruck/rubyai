Feature: add stages
	
	As a Ruby'Ai Writer
	I want to add stages
	So that I have a place to put everything
	
	Scenario: add a stage
		Given an empty script
		When I add a stage named "Bedroom"
		Then the list of characters should include "Bedroom"
