Given /^a sound :(.*) named "([^"]*)"$/ do |sound_id, sound_name|
  game.parse_script do
    for_sounds do
      add sound_id.to_sym, sound_name
    end
  end
end

