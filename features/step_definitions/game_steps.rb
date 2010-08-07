Given /^an empty script$/ do
  @output = output
  @input = input
  
  game_environment = RubyAi::Game.new(@input, @output)
  game = RubyAi::GameWorkspace.new(game_environment)
end

When /^I start a game$/ do
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

Then /^I should see only:$/ do |results|
  filtered_results = results.split("\n")
  @output.messages.should == filtered_results
end
