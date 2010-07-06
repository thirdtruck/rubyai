When /^I add a scene with alias :(.*)$/ do |scene_name|
  @game.parse_script do
    add_scene scene_name.to_sym
  end
end

Given /^a scene with alias :(.*)$/ do |scene_name|
  @current_scene = scene_name
end

Then /^the list of scenes should include :(.*)$/ do |scene|
  @game.scenes.should include scene.downcase.to_sym
end

When /^I call `([^`]*)` in the scene$/ do |command|
  @output.puts @game.parse_script do
    add_scene @current_scene do
      eval(command)
    end
  end
end

