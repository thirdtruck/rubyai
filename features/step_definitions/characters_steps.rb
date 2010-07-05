Given /^an empty script$/ do
  require "lib/RubyAi"
  @engine = RubyAi.new
  @results = []
end

When /^I add a character named "([^"]*)"$/ do |character_name|
  @engine.parse_script do
    for_characters do
      add character_name.downcase.to_sym, character_name
    end
  end
end

Then /^the list of characters should include "([^`]*)"$/ do |character_name|
  @engine.characters.include?(character_name.downcase.to_sym)
end

Given /^a character named "([^"]*)"$/ do |character_name|
  @engine.parse_script do
    for_characters do
      add character_name.downcase.to_sym, character_name
    end
  end
end

When /^I call `([^`]*)`$/ do |command|
  @results << @engine.parse_script do
    eval(command)
  end
end

Then /^I should see "([^"]*)"$/ do |output|
  @results.include?(output)
end
