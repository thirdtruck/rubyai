When /^I add a stage named "([^"]*)"$/ do |stage_name|
  @game.parse_script do
    for_stages do
      add stage_name.downcase.to_sym, stage_name
    end
  end
end
