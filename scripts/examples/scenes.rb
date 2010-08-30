add_scene :intro do
	show computer_desk
	show marcus
	narrate "Available example scenes:"
	choice do
		option "Basic Commands" do
			narrate "Let's learn about the basic commands!"
			run_scene :basic_commands
		end
		option "Variables" do
			narrate "Now to learn about variables!"
			run_scene :variables
		end
		option "Conditionals" do
			narrate "Now to learn about conditional code!"
			run_scene :conditionals
		end
	end
	narrate "Thanks for playing!"
end

add_scene :basic_commands do
	marcus says "I said something."
	marcus thusly "does something."
	marcus "wants to remind you that starting the line with a lowercase letter makes it an action automatically!"
	marcus "Anything else and it assumes a statement."
end

add_scene :variables do
	set_var :location => "Puerto Rico"
	marcus "I made a wonderful choice by vacationing in #{get_var :location}."
	set_var :location => "Australia"
	marcus "Still, I wonder whether I would have enjoyed #{get_var :location} even more."
end

add_scene :conditionals do
	narrate "Variable comparison:"
	set_var :foo => "bar"
	compare_var :foo do
		on "bar" do
			marcus "Are you old enough to drink?"
		end
		on "bin" do
			marcus "The game should use the code above, not this code!"
		end
		default do
			marcus "The game will call this code if the variable's value matches none of the above values."
		end
	end
end
