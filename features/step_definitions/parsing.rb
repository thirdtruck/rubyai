Then /^variable :(\w*) should equal "([^"]*)"$/ do |variable_name, value|
  game.parse_script do
    get_var(variable_name.to_sym).to_s.should == value
  end
end

