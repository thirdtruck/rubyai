Feature: scene events
	
	As a Ruby'Ai Writer
	I want to add events to my scenes
	So that interesting things happen
	
	Scenario: show a stage
		Given an empty script
		And a scene with alias :intro
		And a stage called "Bedroom" and described as "A messy bedroom."
		When I call `show bedroom` in the scene
		Then I should see "A messy bedroom."

