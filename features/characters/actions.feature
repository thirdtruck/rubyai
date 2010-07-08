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

