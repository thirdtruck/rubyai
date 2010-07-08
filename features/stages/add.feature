Feature: add stages
	
	As a Ruby'Ai Writer
	I want to add stages
	So that I have a place to put everything
	
	Scenario: add a stage
		Given an empty script
		When I add a :bedroom stage named "Bedroom"
		Then the list of stages should include a :bedroom stage named "Bedroom"
	
	Scenario: add a stage with a description
		Given an empty script
		When I add a :bedroom stage named "Bedroom" and described as "The place where I sleep."
		Then the list of stages should include a :bedroom stage named "Bedroom"
		And the :bedroom stage should have a description of "The place where I sleep."
