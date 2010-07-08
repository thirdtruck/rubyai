Feature: scene events
	
	As a Ruby'Ai Writer
	I want to add events to my scenes
	So that interesting things happen
	
	Scenario: show a stage
		Given an :intro scene with contents `show bedroom`
		And a :bedroom stage named "Bedroom" and described as "A messy bedroom."
		And I run scene :intro
		Then I should see "A messy bedroom."

	Scenario: show two stages
		Given an :intro scene
		And a :bedroom stage named "Bedroom" and described as "A messy bedroom."
		And a :kitchen stage named "Kitchen" and described as "My den of culinary iniquity."
		When I add `show bedroom` to scene :intro
		And I add `show kitchen` to scene :intro
		And I run scene :intro
		Then I should see "A messy bedroom."
		And I should see "My den of culinary iniquity."

