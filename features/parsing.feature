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
	
	Scenario: show inline code
		Given an :intro scene
		When I add `narrate "Try entering #{code 'show tired_lucy'} into the parser."` to scene :intro
		And I run scene :intro
		Then I should see "Try entering `show tired_lucy` into the parser."
	
	Scenario: show a single line of code in regular quotes
		Given an :intro scene
		When I add `code_block "show lucy"` to scene :intro
		And I run scene :intro
		Then I should see only:
			"""
			CODE>>>
			show lucy
			<<<CODE
			"""
	
	Scenario: show a single line of code in block quotes
		Given an :intro scene
		When I add `code_block %{show lucy}` to scene :intro
		And I run scene :intro
		Then I should see only:
			"""
			CODE>>>
			show lucy
			<<<CODE
			"""
	
	Scenario: show multiple lines of code
		Given an :intro scene
		When I add the following to scene :intro:
			"""
			code_block %{
				show adjective_character
				character "does x."
				character "I say y."
			}
			"""
		And I run scene :intro
		Then I should see only:
			"""
			CODE>>>
				show adjective_character
				character "does x."
				character "I say y."
			<<<CODE
			"""
