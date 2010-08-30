Feature: conditionals
	
	As a Ruby'Ai Writer
	I want conditional code
	So that the player's choices can have long-term impact on the game-play
	
	Scenario: compare_var, one condition
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			set_var :var_x => "my value"
			compare_var :var_x do
				on "my value" do
					narrate "Selected for my value."
				end
			end
			"""
		And I run scene :intro
		Then I should see only:
			"""
			Selected for my value.
			"""
	
	Scenario: compare_var, first of two conditions
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			set_var :var_x => "my value"
			compare_var :var_x do
				on "my value" do
					narrate "Selected for my value."
				end
				on "my other value" do
					narrate "Selected for my other value."
				end
			end
			"""
		And I run scene :intro
		Then I should see only:
			"""
			Selected for my value.
			"""
	
	Scenario: compare_var, second of two conditions
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			set_var :var_x => "my other value"
			compare_var :var_x do
				on "my value" do
					narrate "Selected for my value."
				end
				on "my other value" do
					narrate "Selected for my other value."
				end
			end
			"""
		And I run scene :intro
		Then I should see only:
			"""
			Selected for my other value.
			"""
	
	Scenario: compare_var, fall back to default in the last position
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			set_var :var_x => "my unselected value"
			compare_var :var_x do
				on "my value" do
					narrate "Selected for my value."
				end
				default do
					narrate "Selected for my default value."
				end
			end
			"""
		And I run scene :intro
		Then I should see only:
			"""
			Selected for my default value.
			"""
	
	Scenario: compare_var, fall back to default in the first position
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			set_var :var_x => "my unselected value"
			compare_var :var_x do
				default do
					narrate "Selected for my default value."
				end
				on "my value" do
					narrate "Selected for my value."
				end
			end
			"""
		And I run scene :intro
		Then I should see only:
			"""
			Selected for my default value.
			"""
	
	Scenario: compare_var, fall back to default in a middle position
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			set_var :var_x => "my unselected value"
			compare_var :var_x do
				on "my first value" do
					narrate "Selected for my value."
				end
				default do
					narrate "Selected for my default value."
				end
				on "my last value" do
					narrate "Selected for my value."
				end
			end
			"""
		And I run scene :intro
		Then I should see only:
			"""
			Selected for my default value.
			"""
	
