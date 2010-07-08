When /^I add an? :(.*) stage named "([^"]*)" and described as "([^"]*)"$/ do |stage_id, stage_name, description|
  game.parse_script do
    for_stages do
      add stage_id.to_sym, stage_name do
        describe_as description
      end
    end
  end
end

When /^I add an? :(.*) stage named "([^"]*)"$/ do |stage_id, stage_name|
  game.parse_script do
    for_stages do
      add stage_id.to_sym, stage_name
    end
  end
end

Then /^the list of stages should include a :(.*) stage named "([^"]*)"$/ do |stage_id, stage_name|
  game.stages[stage_id.to_sym].name.should == stage_name
end

Then /^the :(.*) stage should have a description of "([^"]*)"$/ do |stage_id, description|
  game.stages[stage_id.to_sym].description.should == description
end

Given /^an? :(.*) stage named "([^"]*)" and described as "([^"]*)"$/ do |stage_id, stage_name, description|
  game.parse_script do
    for_stages do
      add stage_id.to_sym, stage_name do
        describe_as description
      end
    end
  end
end

