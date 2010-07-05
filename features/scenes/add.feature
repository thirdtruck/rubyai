Feature: add scenes
	
	As a Ruby'Ai Writer
	I want to add scenes
	So that I have a place for things to happen
	
	Scenario: add a scene
		Given an empty script
		When I add a scene called "bedroom"
		Then the list of scenes should include "bedroom"

