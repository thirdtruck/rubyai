Feature: character actions
	
	As a Ruby'Ai Writer
	I want characters that say and do things
	So that I can have an interesting game
	
	Scenario: character speaks implicitly
		Given an empty script
		And a :lucy character named "Lucy"
		When I call `lucy "Hello, World!"`
		Then I should see "Lucy: Hello, World!"

	Scenario: character speaks explicitly
		Given an empty script
		And a :lucy character named "Lucy"
		When I call `lucy says "Hello, World!"`
		Then I should see "Lucy: Hello, World!"

	Scenario: character performs an action implicitly
		Given an empty script
		And a :lucy character named "Lucy"
		When I call `lucy "does something."`
		Then I should see "Lucy does something."

	Scenario: character performs an action explicitly
		Given an empty script
		And a :lucy character named "Lucy"
		When I call `lucy thusly "does something."`
		Then I should see "Lucy does something."

	Scenario: character speaks implicitly across multiple lines
		Given an empty script
		And a :lucy character named "Lucy"
		When I call `lucy "Hello, World!", "How are you today?"`
		Then I should see "Lucy: Hello, World!"
		And I should see "Lucy: How are you today?"
	
	Scenario: a character in a mood says something
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `smiling_lucy "I won the prize!"` to scene :intro
		And I run scene :intro
		Then I should see "[Smiling] Lucy: I won the prize!"
	
	Scenario: a character in a mood performs an action
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `terrified_lucy "drops her raffle ticket."` to scene :intro
		And I run scene :intro
		Then I should see "[Terrified] Lucy drops her raffle ticket."
