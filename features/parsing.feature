Feature: parsing
	
	As a Ruby'Ai Writer
	I want to have special features inside my text
	So that I can make the text more interesting and keep it D.R.Y.
	
	Scenario: character uses emphasis
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `lucy "I #{em 'really'} need that ticket back."` to scene :intro
		And I run scene :intro
		Then I should see "Lucy: I /really/ need that ticket back."
	
	Scenario: character uses strong words
		Given an :intro scene
		And a :lucy character named "Lucy"
		When I add `lucy "Could you #{st 'not'} step on my toe again?"` to scene :intro
		And I run scene :intro
		Then I should see "Lucy: Could you *not* step on my toe again?"
	
	Scenario: show a url
		Given an :intro scene
		When I set the URL :homepage to "http://www.rubyai.org"
		When I add `narrate "You can visit us at #{url :homepage}!"` to scene :intro
		And I run scene :intro
		Then I should see "You can visit us at [http://www.rubyai.org]!"
	
	Scenario: show a url with a description
		Given an :intro scene
		When I set the URL :homepage to "http://www.rubyai.org"
		When I add `narrate "You can visit us at #{url :homepage, 'our homepage'}!"` to scene :intro
		And I run scene :intro
		Then I should see "You can visit us at our homepage [http://www.rubyai.org]!"
	
	Scenario: show code
		Given an :intro scene
		When I add `narrate "Try entering #{code 'show tired_lucy'} into the parser."` to scene :intro
		And I run scene :intro
		Then I should see "Try entering `show tired_lucy` into the parser."
