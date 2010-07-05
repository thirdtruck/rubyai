Given /^an empty script$/ do
  @output = output
  @game = RubyAi::Game.new(@output)
  @results = []
end

When /^I add a character named "([^"]*)"$/ do |character_name|
  @game.parse_script do
    for_characters do
      add character_name.downcase.to_sym, character_name
    end
  end
end

Then /^the list of characters should include "([^`]*)"$/ do |character_name|
  @game.characters.include?(character_name.downcase.to_sym)
end

Given /^a character named "([^"]*)"$/ do |character_name|
  @game.parse_script do
    for_characters do
      add character_name.downcase.to_sym, character_name
    end
  end
end

When /^I call `([^`]*)`$/ do |command|
  @output.puts @game.parse_script do
    eval(command)
  end
end

Then /^I should see "([^"]*)"$/ do |results|
  @output.messages.include?(results)
end

When /^I give them an alias of "([^"]*)"$/ do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then /^the character "([^"]*)" should be the same as "([^"]*)"$/ do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end
