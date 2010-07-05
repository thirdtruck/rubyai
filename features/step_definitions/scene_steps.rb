When /^I add a scene with alias :(.*)$/ do |scene_name|
  @game.parse_script do
    add_scene scene_name.to_sym
  end
end

Then /^the list of scenes should include :(.*)$/ do |scene|
  @game.scenes.include?(scene.downcase.to_sym)
end

