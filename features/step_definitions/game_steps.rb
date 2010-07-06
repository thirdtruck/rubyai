Given /^I am not yet playing$/ do
end

Given /^an empty script$/ do
  @output = output
  game = RubyAi::Game.new(@output)
  
  game.start
end

When /^I start a game$/ do
  @output = output
  game = RubyAi::Game.new(@output)
  
  game.start
end

When /^I call `([^`]*)`$/ do |command|
  game.parse_script do
    eval(command)
  end
end

Then /^I should see "([^"]*)"$/ do |results|
  @output.messages.should include results
end

