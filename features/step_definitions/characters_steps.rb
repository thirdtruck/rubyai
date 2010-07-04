class Output
  def messages
    @messages ||= []
  end
  
  def puts(message)
    @messages << message
  end
end
  
def output
    @output ||= Output.new
end

Given /^an empty script$/ do
  pending # express the regexp above with the code you wish you had
end

When /^I add a character named "([^"]*)"$/ do |character_name|
  pending # express the regexp above with the code you wish you had
end

Then /^calling `([^`]*)` should return that character$/ do |command|
  pending # express the regexp above with the code you wish you had
end

Given /^a character named "([^"]*)"$/ do |character_name|
  require "lib/RubyAi"
  @engine = RubyAi.new
  @engine.parse_script do
    for_characters do
      add :lucy, "Lucy"
    end
  end
end

When /^I call `([^`]*)`$/ do |command|
  @result = @engine.parse_script do
    eval(command)
  end
end

Then /^I should see "([^"]*)"$/ do |output|
  @result.should == output
end
