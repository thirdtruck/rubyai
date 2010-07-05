Given /^I am not yet playing$/ do
end

When /^I start a game$/ do
  @output = output
  @game = RubyAi::Game.new(@output)
  @results = []
end
