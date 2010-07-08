When /^I add an? :(.*) character named "([^"]*)"$/ do |character_id, character_name|
  game.parse_script do
    for_characters do
      add character_id.to_sym, character_name
    end
  end
end

Then /^the list of characters should include :(.*)$/ do |character_id|
  game.characters.should include character_id.to_sym
end

Given /^an? :(.*) character named "([^"]*)"$/ do |character_id, character_name|
  game.parse_script do
    for_characters do
      add character_id.to_sym, character_name
    end
  end
end

When /^I give them a pseudonym of :(.*) with name "([^"]*)"$/ do |pseudonym_id, pseudonym_name|
  pending # express the regexp above with the code you wish you had
end

Then /^the character :(.*) should be the same as :(.*)$/ do |first_character_id, second_character_id|
  pending # express the regexp above with the code you wish you had
end
