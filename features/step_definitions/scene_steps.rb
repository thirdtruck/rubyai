When /^I add a scene with alias :(.*)$/ do |scene_name|
  game.parse_script do
    add_scene scene_name.to_sym
  end
end

Given /^a scene with alias :(.*) and contents `([^`]*)`$/ do |scene_name, contents|
  game.parse_script do
    add_scene scene_name.to_sym do
      instance_eval contents
    end
  end
end

Given /^a scene with alias :([^\s]*)$/ do |scene_name|
  @current_scene = scene_name
end

Then /^the list of scenes should include :(.*)$/ do |scene|
  game.scenes.should include scene.downcase.to_sym
end

When /^I call `([^`]*)` in the scene$/ do |command|
  game.parse_script do
    add_scene @current_scene do
      eval(command)
    end
  end
end

When /^I run a scene called :(.*)$/ do |scene|
  game.parse_script do
    run_scene(scene.to_sym)
  end
end
