Feature: character actions
	
	As a Ruby'Ai Writer
	I want characters that say and do things
	So that I can have an interesting game
	
	Scenario: character speaks
		Given a character named "Lucy"
		When I call `lucy "Hello, World!"`
		Then I should see "Lucy: Hello, World!"

