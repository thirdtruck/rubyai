When /^I add a stage named "([^"]*)"$/ do |stage_name|
  @game.parse_script do
    for_stages do
      add stage_name.downcase.to_sym, stage_name
    end
  end
end

When /^I add a stage named "([^"]*)" with a description of "([^"]*)"$/ do |stage_name, description|
  @game.parse_script do
    for_stages do
      add stage_name.downcase.to_sym, stage_name do
        describe_as description
      end
    end
  end
end

Then /^the list of stages should include "([^"]*)"$/ do |stage_name|
  @game.stages.should include stage_name.downcase.to_sym
end

Then /^the stage "([^"]*)" should have a description of "([^"]*)"$/ do |stage_name, description|
  @game.stages[stage_name.downcase.to_sym].description.should == description
end

Given /^a stage called "([^"]*)" and described as "([^"]*)"$/ do |stage_name, description|
  @game.parse_script do
    for_stages do
      add stage_name.downcase.to_sym, stage_name do
        describe_as description
      end
    end
  end
end

