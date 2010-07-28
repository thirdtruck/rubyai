add_scene :intro do
	show bedroom
	
	# By default, `sound <id>` will try to play an audio file named "<id>.ogg" and display the text as "*<sound.name>*"
	sound click
	
	# The command `<character> "string"` makes the character say or do something, depending on the
	# capitalization of the first letter (uppercase -> statement, lowercase -> action).
	tired_lucy "Phew!  Gym class sucks!  At least I lasted all the way through."
	lucy "sighs as she tosses her backpack aside."
	
	# Use `<character> says "statement"` or `character thusly "does something"` if you need explicit 
	# commands
	excited_lucy says "Now for my homework, then sleep!"
	lucy thusly "flops onto her chair."
	
	narrate "The hours fly by as she types, the essays practically pouring out of her fingers and into the keyboard.",
		"Hitting Ctrl-P just as the sun finishes setting, #{lucy} starts nodding off as the churning of the printer serenades her."
	
	tired_lucy "yawns."
	lucy "Just one more assigment..."
	
	terrified_lucy "Ahhhh!",
	     "My art class assignment!"
	
	hidden_fairy "Don't forget about it!"
	mortified_lucy "I can't graduate unless I pass!",
	     "Why did I ever take that elective?  I'm an English major!"
	hidden_fairy "You can't graduate without it!"
	
	show annoyed_lucy
	lucy "I know!",
	     "I just said that!"
	
	run_scene :very_first_choice
end
	
add_scene :very_first_choice do
	show pleased_fairy
	terrified_lucy "Who the heck are you?"
	
	hurt_fairy "You don't recognize your own Ruby'Ai Fairy?"
	tired_lucy "You really want me to believe that?  Seriously?"
	terrified_fairy "But you must!  We fairies only last as long as you believe in us!"
	
	choice do
		option "Believe in the #{fairy}" do run_scene :believe end
		option "Disbelieve in the #{fairy}" do run_scene :disbelieve end
	end
end

add_scene :disbelieve do
	show thinking_lucy
	show terrified_fairy
	
	narrate "Thinking back to her Intro to Psychology Class, #{lucy} empties her mind, focusing all of her skepticism on the floating figure before her."
	
	sound poof
	show exploding_fairy
	hide fairy
	show terrified_lucy
	
	narrate "With a horrible scream, the #{fairy} vanishes in a cloud of sparkles."
        lucy "spends the rest of the night researching \"Hallucinations\" and local folklore on AltMed and Wikipedia instead of finishing her homework.  Exhausted, she sleeps in late, missing the class entirely and forced into another year of classes and student loans."
	
	choice do
		option "Try that first choice again?" do run_scene :very_first_choice end
		option  "Quit now" do game_over :failure end
	end
end

add_scene :believe do
	show excited_fairy
	show tired_lucy
	fairy "You do believe, you do!  I can feel it.  I'll earn my Fairy Wand yet!"
	lucy "You don't even have your wand yet?  Are you kidding me?"
	
	stern_fairy "And you still don't have your art class assignment."
	terrified_lucy "Riiight."
	
	run_scene :install
end

add_scene :install do
	show computer_desk
	
	tired_lucy "So what do we do now, Miss #{fairy}?"
	
	fairy "Now I get to help you write a novel!"
	
	show tired_lucy
	
	terrified_lucy "That doesn't help me in the #{st 'slightest'}!"
	tired_lucy "I would have written one already if I thought that my #{em 'art'} teacher would accept it."
	
	bemused_fairy "What about a #{em 'visual'} novel?"
	
	tired_lucy "Eh?"
	
	typing_fairy "types a URL into #{lucy}'s browser."
	fairy "They call them \"Ren'Ai\" in Japan!  It uses pictures #{em 'and'} words to create a whole new experience!"
	
	confused_lucy "You said \"Ren'Ai\" --"
	excited_fairy "That I did!"
	tired_lucy "That you did."
	questioning_lucy "So why did you go to \"#{url :rubyai_homepage}\"?"
	
	excited_fairy "Because you need software like this to make it happen!"
	
	terrified_lucy "S-s-software?  How can you expect me to #{em 'program'} at this hour?!  Besides..."
	tired_lucy "Besides..."
	questioning_lucy "Does it even work on my computer?  It runs..."
	
	run_scene :choose_os
end

add_scene :choose_os do
	# TODO: Set some variables here so that we can give OS-specific commands later
	choice do
		option "Linux" do
			@os = "linux"
			run_scene :install_linux
		end
		option "Windows" do
			@os = "windows"
			run_scene :install_windows
		end
		option "Mac OS X" do
			@os = "osx"
			run_scene :install_osx
		end
		option "In the Browser" do
			@os = "browser"
			run_scene :install_browser
		end
	end
	
	narrate "With a little help from the #{url :message_boards, 'message boards'}, #{lucy} and the #{fairy} soon have the #{em 'Ruby\'Ai'} software up and running."
	
	if @os == "browser"
		typing_fairy "And now we go to the #{url :create_game, 'Create a Game'} page!"
		
		run_scene :initialize_in_browser
	else
		typing_fairy "And now we go to the project directory we made... \"my_first_renai\"..."
		worried_lucy "Did everything work?"
		excited_fairy "It sure did!"
		
		terried_lucy "Egads!  Look at all those directories!",
				"\"bin\", \"lib\", \"web\", what does it all #{em 'meeeeeean!?'}"
		soulless_lucy "..."
		frantic_fairy "Don't die on me now!"
		terrified_lucy "Get away from me with those paddles!"
		show apologetic_fairy
		
		tired_lucy "types away at the computer, one key at a time."
		
		run_scene :command_line_setup
	end
	
	run_scene :first_script
end

add_scene :install_linux do
	excited_fairy "It sure does!"
	# gem installation directions
end

add_scene :install_windows do
	excited_fairy "You bet it does!"
	# gem installation directions
end

add_scene :install_osx do
	excited_fairy "It even runs on that!"
	# gem installation directions
end

add_scene :install_browser do
	excited_fairy "You can even try it out in your browser!"
	# gem installation directions
end

add_scene :command_line_setup do
	default_lucy "Okay, Miss #{fairy}, what do I do now?"
	bespeckled_fairy "Let me see.. its says that you should, after installing the software..."
	tired_lucy "You're still reading the manual?"
	confused_lucy "stares at the screen."
	
	choice do
		option "media" do run_scene :directory_media end
		option "web" do run_scene :directory_web end
		option "scripts" do run_scene :directory_scripts end
	end
end

add_scene :directory_media do
	bespeckled_fairy "looks up from the book."
	terrified_fairy "You can't go in there!"
	confused_lucy "opens the directory accidentially."
	worried_lucy "Wait, what's this \"lucy.png\" image...?"
	show terrified_fairy
	terrified_lucy "It's a picture of #{em 'me'}!  I'm looking at a picture of me, looking at a picture of me, of me, of me..."
	narrate "#{lucy}'s universe segfaults from the recursive loop and implodes."
	
	choice do
		option "Try that again?" do run_scene :command_line_setup end
		option  "Quit now" do game_over :failure end
	end
end

add_scene :directory_web do
	terrified_lucy "It's empty!"
	confused_fairy "What's empty?!"
	indignant_lucy "The \"web\" directory!"
	bemused_fairy "Oh, that's perfectly normal."
	tired_lucy "What the heck do you expect me to do with an empty directory?"
	default_fairy "Nothing yet.  #{em 'Ruby\'Ai'} will put all of the actual game file after we export the finished project!"
	tired_lucy "Oh.",
		"So where do I go?"
	excited_fairy "To the \"scripts\" directory!"
	show typing_fairy
	
	run_scene :directory_scripts
end

add_scene :directory_scripts do
	confused_lucy "It's empty."
	
	default_fairy "Oh, we just need to run the script setup command!"
	if @os == "linux" or @os == "osx"
		fairy "Type in #{code 'ruby bin/new_script.rb my_first_renai'}."
	elsif @os == "windows"
		fairy "Type in #{code 'ruby.exe bin\\new_script.rb my_first_renai'}"
	end
	
	worried_lucy "I have to type all of that out correctly..."
	excited_fairy "Just this once!"
	typing_lucy "If you say so..."
	
	terrified_lucy "Ah, an error!  Did I #{em 'break'} it?  Tell me I didn't break it!"
	excited_fairy "Don't worry!",
		"You can try it again.",
		"I have confidence in you!"
	typing_lucy "...",
		"Oh!  I forgot a period."
	show gasping_lucy
	lucy "It works!"
	excited_fairy "It works!"
end

add_scene :initialize_in_browser do
	# Web-based initialization goes here
	terrified_fairy "I can't reach the site!"
	tired_lucy "pulls the keyboard over.",
		"Let's just install a local copy."
	
	run_scene :choose_os
end

add_scene :first_script do
	worried_lucy "So what do I do now?"
	
	if @os == "windows"
		@first_script_directory = "scripts\\my_first_renai\\scenes.rb"
	else
		@first_script_directory = "scripts/my_first_renai/scenes.rb"
	end
	
	bespeckled_fairy "Now we open up the #{@first_script_directory} file!"
	worried_lucy "Okay...",
		"It says #{code 'add_scene :intro'}, #{code 'lucius says "Hello!"'}, and #{code 'end'}."
	excited_fairy "That's right!  #{em 'Ruby\'Ai'} always runs the \"intro\" scene first, if you add one, so it makes one for you automagically!"
end
