When /^I add an? :(.*) scene$/ do |scene_id|
  game.parse_script do
    add_scene scene_id.to_sym
  end
end

Given /^an? :(.*) scene with contents `([^`]*)`$/ do |scene_id, contents|
  game.parse_script do
    add_scene scene_id.to_sym do
      eval contents
    end
  end
end

Given /^an? :(.*) scene$/ do |scene_id|
  game.parse_script do
    add_scene scene_id.to_sym
  end
end

Then /^the list of scenes should include :(.*)$/ do |scene_id|
  game.scenes.should include(scene_id.to_sym)
end

When /^I call `([^`]*)` in scene :(.*)$/ do |command, scene_id|
  game.parse_script do
    add_scene scene_id.to_sym do
      eval(command)
    end
  end
end

When /^I run scene :(.*)$/ do |scene_id|
  game.parse_script do
    run_scene(scene_id.to_sym)
  end
end

When /^I add `([^`]*)` to scene :(.*)$/ do |command, scene_id|
  game.parse_script do
    _append_to_scene scene_id.to_sym do
      instance_eval(command)
    end
  end
end

When /^I choose option "([^"]*)"$/ do |choice|
  @input.add_message(choice)
end

