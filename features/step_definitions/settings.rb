When /^I set the URL :(.*) to "([^"]*)"$/ do |url_alias, url|
	game.parse_script do
		for_settings do
			for_urls do
				set url_alias.to_sym, url
			end
		end
	end
end

