Feature: character actions
	
	As a Ruby'Ai Writer
	I want characters that say and do things
	So that I can have an interesting game
	
	Scenario: character speaks implicitly
		Given a character named "Lucy"
		When I call `lucy "Hello, World!"`
		Then I should see "Lucy: Hello, World!"

	Scenario: character speaks explicitly
		Given a character named "Lucy"
		When I call `lucy says "Hello, World!"`
		Then I should see "Lucy: Hello, World!"

	Scenario: character performs an action implicitly
		Given a character named "Lucy"
		When I call `lucy "does something."`
		Then I should see "Lucy does something."

	Scenario: character performs an action explicitly
		Given a character named "Lucy"
		When I call `lucy then "does something."`
		Then I should see "Lucy does something."

