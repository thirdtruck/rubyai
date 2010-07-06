Feature: scene events
	
	As a Ruby'Ai Writer
	I want to add events to my scenes
	So that interesting things happen
	
	Scenario: show a stage
		Given a scene with alias :intro and contents `show bedroom`
		And a stage called "Bedroom" and described as "A messy bedroom."
		When I run a scene called :intro
		Then I should see "A messy bedroom."

	Scenario: show two stages
		Given a scene with alias :intro
		And a stage called "Bedroom" and described as "A messy bedroom."
		And a stage called "Kitchen" and described as "My den of culinary iniquity."
		When I run a scene called :intro
		Then I should see "A messy bedroom."
		And I should see "My den of culinary iniquity."

