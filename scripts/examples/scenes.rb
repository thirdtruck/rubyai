add_scene :intro do
	narrate "Available example scenes:"
	choice do
		option "Variables" do
			run_scene :variables
		end
	end
end

add_scene :variables do
	set_var :location => "Puerto Rico"
	marcus "I made a wonderful choice by vacationing in #{get_var :location}."
	set_var :location => "Australia"
	marcus "Still, I wonder whether I would have enjoyed #{get_var :location} even more."
end
