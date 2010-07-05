Feature: add stages
	
	As a Ruby'Ai Writer
	I want to add stages
	So that I have a place to put everything
	
	Scenario: add a stage
		Given an empty script
		When I add a stage named "Bedroom"
		Then the list of stages should include "Bedroom"
	
	Scenario: add a stage with a description
		Given an empty script
		When I add a stage named "Bedroom" with a description of "The place where I sleep."
		Then the list of stages should include "Bedroom"
		And the stage "Bedroom" should have a description of "The place where I sleep."
