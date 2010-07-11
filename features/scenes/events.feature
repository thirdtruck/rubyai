Feature: scene events
	
	As a Ruby'Ai Writer
	I want to add events to my scenes
	So that interesting things happen
	
	Scenario: show a character
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `show lucy, :smiling` to scene :intro
		And I run scene :intro
		Then I should see "[Lucy smiling]"

	Scenario: show a stage
		Given an :intro scene with contents `show bedroom`
		And a :bedroom stage named "Bedroom" and described as "A messy bedroom."
		When I run scene :intro
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

	Scenario: hide a character
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `hide lucy` to scene :intro
		And I run scene :intro
		Then I should see "[Hide Lucy]"

	Scenario: hide a stage
		Given an :intro scene
		And a :bedroom stage named "Bedroom" and described as "A messy bedroom."
		When I add `hide bedroom` to scene :intro
		And I run scene :intro
		Then I should see "[Hide Bedroom]"

	Scenario: play a sound
		Given an :intro scene
		And a sound :click named "Click"
		When I add `sound click` to scene :intro
		And I run scene :intro
		Then I should see "*Click*"
	
	Scenario: narration
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `narrate "And then the sun set."` to scene :intro
		And I run scene :intro
		Then I should see "And then the sun set."
		
	Scenario: narration with references
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `narrate "And then the sun set as #{lucy} watched on."` to scene :intro
		And I run scene :intro
		Then I should see "And then the sun set as Lucy watched on."
		
	Scenario: multi-part narration
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `narrate "And then the sun set.", "But that next morning..."` to scene :intro
		And I run scene :intro
		Then I should see "And then the sun set."
		And I should see "But that next morning..."
		
	Scenario: gave over, generic
		Given an :intro scene
		When I add `game_over` to scene :intro
		And I run scene :intro
		Then I should see "Game Over!"
		And I should see "Please play again!"
		
	Scenario: gave over, success
		Given an :intro scene
		When I add `game_over :success` to scene :intro
		And I run scene :intro
		Then I should see "Game Over!"
		And I should see "You win!"
		
	Scenario: gave over, failure
		Given an :intro scene
		When I add `game_over :failure` to scene :intro
		And I run scene :intro
		Then I should see "Game Over!"
		And I should see "You lose!"
