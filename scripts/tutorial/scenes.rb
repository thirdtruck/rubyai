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
	
	bemused_fairy "What about an interactive, #{em 'visual'} novel?"
	
	tired_lucy "Interactive?  Visual?"
	
	typing_fairy "types a URL into #{lucy}'s browser."
	fairy "They call them \"Ren'Ai\" in Japan!  It uses pictures #{em 'and'} words to create a whole new experience!"
	
	confused_lucy "You said \"Ren'Ai\" --"
	excited_fairy "That I did!"
	tired_lucy "That you did."
	questioning_lucy "So why did you go to \"#{url :rubyai_homepage}\"?"
	
	excited_fairy "Because you need software like this to make it happen!"
	
	terrified_lucy "S-s-software?  How can you expect me to #{em 'program'} at this hour?!"
	tired_lucy "Besides..."
	questioning_lucy "Does it even work on my computer?  It runs..."
	
	run_scene :choose_os
end

add_scene :choose_os do
	# TODO: Set some variables here so that we can give OS-specific commands later
	choice do
		option "Linux" do
			set_var :os => "linux"
			run_scene :install_linux
		end
		option "Windows" do
			set_var :os => "windows"
			run_scene :install_windows
		end
		option "Mac OS X" do
			set_var :os => "osx"
			run_scene :install_osx
		end
		option "In the Browser" do
			set_var :os => "browser"
			run_scene :install_browser
		end
	end
	
	narrate "With a little help from the #{url :message_boards, 'message boards'}, #{lucy} and the #{fairy} soon have the #{em 'Ruby\'Ai'} software up and running."
	
	compare_var :os do
		on "browser" do 
			typing_fairy "And now we go to the #{url :create_game, 'Create a Game'} page!"
			
			run_scene :initialize_in_browser
		end
		default do
			typing_fairy "And now we go to the project directory we made... \"my_first_renai\"..."
			worried_lucy "Did everything work?"
			excited_fairy "It sure did!"
			
			terrified_lucy "Egads!  Look at all those directories!",
					"\"bin\", \"lib\", \"web\", what does it all #{em 'meeeeeean!?'}"
			soulless_lucy "..."
			frantic_fairy "Don't die on me now!"
			terrified_lucy "Get away from me with those paddles!"
			show apologetic_fairy
			
			tired_lucy "types away at the computer, one key at a time."
			
			run_scene :command_line_setup
		end
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
	bespectacled_fairy "Let me see.. its says that you should, after installing the software..."
	tired_lucy "You're still reading the manual?"
	confused_lucy "stares at the screen."
	
	choice do
		option "media" do run_scene :directory_media end
		option "web" do run_scene :directory_web end
		option "scripts" do run_scene :directory_scripts end
	end
end

add_scene :directory_media do
	bespectacled_fairy "looks up from the book."
	terrified_fairy "You can't go in there!"
	confused_lucy "opens the directory accidentially."
	worried_lucy "Wait, what's this \"lucy.png\" image...?"
	show terrified_fairy
	terrified_lucy "It's a picture of #{em 'me'}!  I'm looking at a picture of me, looking at a picture of me, of me, of me..."
	narrate "#{lucy}'s universe segfaults from the recursive loop and implodes."
	set_var :doom => "true"
	
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
	compare_var :os do
		on "windows" do
			fairy "Type in #{code 'ruby.exe bin\\new_script.rb my_first_renai'}"
		end
		default do
			fairy "Type in #{code 'ruby bin/new_script.rb my_first_renai'}."
		end
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
	
	compare_var :os do
		on "windows" do
			set_var :first_script_directory => "scripts\\my_first_renai\\scenes.rb"
		end
		default do
			set_var :first_script_directory => "scripts/my_first_renai/scenes.rb"
		end
	end
	
	bespectacled_fairy "Now we open up the #{embed_var :first_script_directory} file!"
	worried_lucy "Okay...",
		"It says:"
	code_block %{
		add_scene :intro
			marcus says "Hello!"
		end
	}
	excited_fairy "That's right!  #{em 'Ruby\'Ai'} always runs the \"intro\" scene first, if you add one, so it makes one for you automagically!"
	
	worried_lucy "What's this \"test_run.rb\" file?"
	show typing_lucy
	tired_lucy "Ugh, another error."
	excited_fairy "This one has its own instructions!  If you don't know what a script does, trying running it and see if it offers any help of its own!"
	typing_lucy "I see now... #{code './test_run.rb tutorial'} ..."
	excited_lucy "And success!  #{marcus} said \"Hello!\"",
		"I think I can actually make this happen.  This girl will graduate this semester yet."
	
	run_scene :first_changes
end

add_scene :first_changes do
	worried_lucy "Okay, now what?  We need more than just this #{marcus} person standing there."
	bespectacled_fairy "I don't know about that; he #{em 'is'} pretty handsome."
	furious_lucy "Focus!"
	terrified_fairy "tumbles backwards into a heap of library books."
	surrendered_fairy "Okay!  Focusing!"
	
	default_fairy "flies back over to the computer."
	bemused_fairy "How about we have him wave?"
	worried_lucy "And how do we do that?"
	bespectacled_fairy "Try this: #{code 'marcus thusy "waves."'}."
	
	tired_lucy "..."
	worried_fairy "Yes?  What?  Is there something on my face?"
	terrified_fairy "Don't tell me that I have a bookworm on my face!",
		"tries desperately to wipe her face on #{lucy}'s shirt before the girl pulls her off of it."
	tired_lucy "No, not that.  It's just that \"thusy\" isn't grammatically correct here."
	distracted_fairy "Oh thank the novella authors.  Feral bookworms constitute a leading cause of fairy death in this country.  Did you know that?"
	tired_lucy "That I did not.  But back to \"thusly\"?"
	focused_fairy "swats something.", "There."
	excited_fairy "Oh!  I actually remember that from my time in Fairy University!"
	confused_lucy "You do?  Wait, from where?"
	bespectacled_fairy "Yep!  The teacher mentioned a  \"language keyword conflict\" or something..."
	worried_lucy "And?"
	tired_fairy "And then I dozed off again."
	furious_lucy "..."
	bemused_fairy "But I've seen your art teacher's assignment handouts and I doubt he'd notice!",
		"Besides, you don't have to use that word anyways!"
	tired_lucy "Now you tell me?"
	
	excited_fairy "That's right!  #{em 'Ruby\'Ai'} will deduce your intent from what you type!"
	wary_lucy "How so?"
	bespectacled_fairy "If the sentence starts with a lowercase letter, #{em 'Ruby\'Ai'} treats it as if you typed \"thusly\".  Otherwise, it acts as if you used \"says\"!"
	typing_lucy "So if I add this to what we already have..."
	code_block %{
		marcus "How are you today?"
		marcus "surveys the terrain."
	}
	typing_lucy "runs the script again and this pops up on the screen:"
	code_block %{
		Prince Marcus: Hello!
		Prince Marcus waves.
		Prince Marcus: How are you today?
		Prince Marcus surveys the terrain.
	}
	excited_fairy "claps!"
	excited_lucy "cheers!"
	narrate "A woman shouts from downstairs."
	mom "#{lucy}, is everything alright up there?"
	surprised_lucy "We woke her!",
		"stuffs a pillow over a scrambling #{fairy}."
	worried_lucy "Everything is just hunky-dory up here, mom!  I just, um, got some good grades back online?"
	mom "Wonderful, dear.  Remember to rest enough before your classes tomorrow, please!  Good night!"
	worried_lucy "Yes, mom!  Good night!"
	terrified_fairy "gasps for air."
	
	run_scene :second_character
end

add_scene :second_character do
	terrified_fairy "You nearly killed me!"
	surprised_lucy "Shh!"
	terrified_fairy "Don't you know that We fairies have #{em 'obnoxiously'} small lungs?"
	worried_lucy "And if I had choked you, I would never finish this visual novel, so that leaves me stuck with you..."
	show soulless_lucy
	terrified_fairy "breaks out a pair of defibrillator paddles and starts rubbing them together."
	tired_lucy "unplugs the defibrillator."
		"Where did you even get...? never mind."
	excited_fairy "Back to the novel?"
	tired_lucy "Back to the novel."
	
	confused_lucy "We need another character.  For that matter, where did we get this #{marcus} guy, and who made him a prince?"
	typing_fairy "From here, in \"characters.rb\"!"
	code_block %{
		add :marcus, "Prince Marcus"
		add :jen, "Jennifer"
	}
	confused_lucy "Who's \"#{jen}\"?"
	bespectacled_fairy "#{em 'Ruby\'Ai'} adds these characters when you create the script files so that you have a starting place right away!"
	curious_lucy "So that first part, \":marcus\", tells us the name to use in the code, right?  And the second part, \"Prince Marcus\", tells the computer what to show in the game itself?"
	excited_fairy "Precisely!   You're really picking this up quickly, you know?  You might not even fail out of college like the last one.  I can almost #{em 'taste'} my fairy wand!"
	terrified_lucy "Last what?"
	confused_lucy "Scratch that.  Do I even want to know what a fairy wand tastes like?"
	pleased_fairy "Snozberry."
	tired_lucy "Apparently I did not want to know."
	curious_lucy "Anyways, what do I do if I want to add, say, \"#{petunia}\", the evil ex-fiancee of #{marcus}?"
	bespectacled_fairy "You simply have to add #{code "add :petunia, \"#{petunia}\""} to \"characters.rb\"!"
	show excited_lucy
	bespectacled_fairy "But #{em 'Ruby\'Ai'} only comes with pictures for the default characters."
	depressed_lucy "Alas.  At least that keeps things simple."
	typing_lucy "pounds out the beginning to her story."
	
	run_scene :exporting
end

add_scene :exporting do
	show bedroom
	
	typing_lucy "types for a while, engrossed in her work."
	bespectacled_fairy "looks up from one of #{lucy}'s books."
		"How's everything coming along?"
	typing_lucy "Pretty good so far..."
	confused_lucy "But this visual novel still has a lot more #{em 'text'} than #{em 'visuals'}."
	excited_fairy "Then the time has arrived to #{em 'export'} it!"
	terrified_lucy "E-e-export?"
	excited_fairy "Yep!  You only have to run a simple command like before!"
	concerned_lucy "Which one?"
	bespectacled_fairy "This time, #{code 'bin/export.rb --help'}!"
	surprised_lucy "Gasp!  Instructions!  This \"--help\" thing really comes in handy."
	excited_fairy "You bet!  Try it with every command.  You never know what you might find!"
	concerned_lucy "So it wants an exporter and a script, if I read this correctly?"
	excited_lucy "A-ha.  #{code 'bin/export.rb --exporters'} gives me a starting point, and according to the example it gives..."
	show anxious_fairy
	confused_lucy "I just need a second to figure it out myself..."
	excited_lucy "This \"javascript\" exporter requires images, so I'll use it!"
	code_block %{bin/export.rb javascript my_first_renai}
	excited_fairy "nods enthusiastically."
	excited_lucy "It works!  I think.  It says to open \"index.html\" in my browser."
	show excited_fairy
	excited_lucy "Success!"
	surprised_lucy "covers her mouth.", "Oh, I mean 'success'."
	excited_fairy "gives #{lucy} a high-five."
	
	run_scene :contexts
end

add_scene :contexts do
	show computer_desk
	concerned_lucy "It makes me glad to finally have a visual novel that's, well, #{em 'visual'}, but where did we get these pictures of #{marcus} and #{jen}?"
	
	compare_var :os do
		on "windows" do
			set_var :character_image_directory => "media\\characters\\"
		end
		default do
			set_var :character_image_directory => "media/characters/"
		end
	end
	
	bespectacled_fairy "How very astute of you!  You can take a look inside of the \"#{embed_var :character_image_directory}\" directory."
	typing_lucy "clicks a few times."
	confused_lucy "I see \"marcus_waving.png\", \"marcus_smiling.png\", \"jen_concerned.png\" and several more."
	worried_lucy "Wait, what's this \"lucy_worried.png\" image about..."
	terrified_fairy "snatches the keyboard away!"
	
	compare_var :doom do
		on "true" do
			terrified_fairy "Not again!"
		end
	end
	
	worried_lucy "What?"
	terrified_fairy "Never mind!"
	bespectacled_fairy "Anyways, those images come with #{em 'Ruby\'Ai'} for you to use in your own games!  You get them under a Creative Commons license, too, so you already have permission for it!"
	smiling_lucy "That was nice of them.", "Now give me my keyboard back."
	surprised_fairy "Oh, of course!"
	tired_lucy "Now what do I do with these other images?"
	excited_fairy "You can show the characters with those moods and actions!",
		"Try adding #{code %{show smiling_marcus}} and #{code %{waving_marcus "runs over to #{jen}."}} and export it again."
	typing_lucy "Okay...",
		"runs through the game."
	surprised_lucy "And now he smiles and waves!  Let's see if I can make him jump like a good little minion of literary domination!"
	tired_lucy "He's just standing there."
	bespectacled_fairy "Yep.  #{em 'Ruby\'Ai'} falls back to the default image - in this case, \"marcus_default.png\" - if it can't find a matching one."
	contemplative_lucy "That #{em 'would'} explain the error message about a \"missing image\"."
	excited_fairy "Why don't you take a look at the other \"marcus\" and \"jen\" images next and write out some more script?  I have another great thing to show you after that!"
	typing_lucy "Okay!"
	
	run_scene :stages
end

# TODO: Consider a choice to choose which areas to cover, invoking options that expire after use
add_scene :stages do
	typing_lucy "wipes the sweat from her brow."
	excited_lucy "So what do you have for me now?"
	bespectacled_fairy "How about a background?"
	confused_lucy "Oh?"
	excited_lucy "Oh!  I hadn't even noticed the lack of scenery."
	show terrified_lucy
	concerned_fairy "What's the matter?"
	terrified_lucy "I just had horrible flashbacks to my landscape painting attempts from back at the beginning of this darn art class."
	worried_lucy "Tell me that the #{em 'Ruby\'Ai'} people lent some backgrounds, too."
	excited_fairy "That they did!"
	tired_lucy "Phew."
	
	compare_var :os do
		on "windows" do
			set_var :stage_image_directory => "media\\stages\\"
		end
		default do
			set_var :stage_image_directory => "media/stages/"
		end
	end
	
	bespectacled_fairy "Check the \"#{embed_var :stage_image_directory}\" directory."
	excited_lucy "Neat."
	typing_lucy "Oh, they have a \"castle.png\" image."
	# TODO: offer a multiple choice or fill-in-the-blank prompt here, allowing the player to guess first.
	contemplative_lucy "Let me guess: going by what we've used before, I should try #{code 'show castle'}?"
	excited_fairy "Exactamundo!"
	excited_lucy "And it works!"
	
	concerned_lucy "But what if I want to add a new stage?  I remember these panoramas from Wikipedia..."
	
	compare_var :os do
		on "windows" do
			set_var :stage_script_directory => "scripts\\my_first_renai\\stages.rb\\"
		end
		default do
			set_var :stage_script_directory => "scripts/my_first_renai/stages.rb"
		end
	end
	
	bespectacled_fairy "Just open up \"#{embed_var :stage_script_directory}\"!"
	code_block %{
		add :castle, "Castle" do
			describe_as "A European castle."
		end
	}
	concerned_lucy "So I just write another one of these \"add\" chunks of code, using the new image's name and title, and then give it a description?"
	excited_fairy  "nods emphatically."
	typing_lucy "opens a browser window and copies a few images into the directory."
		"then writes more of \"#{embed_var :stage_script_directory}\"."
	excited_lucy "And now I can add #{code 'show garden'} and #{code 'show farm'} and -"
	frantic_fairy "Whoa, whoa, whoa!  Give your poor characters a chance to rest!"
	tired_fairy "You'll tire out the players with all that movement, too."
	show terrified_lucy
	worried_fairy "#{lucy}?"
	
	run_scene :choices
end

add_scene :choices do
	terrified_lucy "quivers in her chair."
	concerned_fairy "By the intractable Fairy's Job Manual, you've gone pale!"
	soulless_lucy "I feel like I've seen a ghost."
	amused_fairy "Silly!  Who in their right mind would believe such a thing as ghosts?"
	tired_lucy "...",
		"This coming from a fairy."
	amused_fairy "I'm a magical creature myself!  #{em 'Of course'}, I would know about these kinds of things."
	worried_fairy "Watch out for zombies and daemons, though."
	worried_lucy "..."
	
	concerned_fairy "Oh, but what #{em 'did'} freak you out?"
	terrified_lucy "I had completely forgotten that this was an #{em 'interactive'} novel."
	concerned_fairy "Well, you don't #{em 'have'} to make it interactive."
		"You could have a linear visual novel, that's perfectly normal."
	worried_lucy "No, that's alright.  Some interactively could win me extra kudos with the teacher."

	excited_fairy "Wonderful!  Let me introduce you to the \"choice\" command."
	concerned_lucy "Another command?"
	excited_fairy "The third-to-last one for tonight?"
	concerned_lucy "Wait, for #{em 'tonight'}?"
	excited_fairy "There's always tomorrow, after all!"
	amused_fairy "If I play my cards right, I could stay assigned to you for the rest of your writing career!"
	show soulless_lucy
	concerned_fairy "Well, you will have an awfully short career if you don't finish this novel."
	terrified_lucy "Writing time!"
	
	concerned_lucy "So how does this \"choice\" command work?"
	typing_fairy "It's the most complicated command so far, so let me show you a complete example:"
	sound keyboard
	set_var :example_choice => %{
		choice do
			option "Wave back at #{marcus}" do jen "waves back!" end
			option "Hide behind a tree" do jen "hides behind a tree"; jen "I'll surprise him!" end
			option "Dance" do
				jen "does a little jig."
				marcus "You have \\\"mad moves\\\", I think."
				jen "bows."
			end
		end
	}
	code_block get_var :example_choice
	terrified_lucy "So much.. code.. vision.. blurring.."
	concerned_fairy "unsheathes her Let's Refocus!(TM)-branded mini-taser."
	sound taser
	excited_lucy "Ahh! What-what-what?"
	show excited_fairy
	tired_lucy "Right."
	
	curious_lucy "Okay, the \"choice\" command itself doesn't look too bad."
	bespectacled_fairy "Nope.  It really just corrals all of the \"option\" commands into a single choice for the user."
	concerned_lucy "Still, those \"option\" commands concern me."
	bespectacled_fairy "Not to worry!  They really just corral a few other commands together.",
		"The semi-colon there just stands in for the linebreak that we normally use to separate commands."
	curious_lucy "Gotcha..."
	excited_fairy "Why not try the choice out?"
	eval get_var :example_choice
	excited_lucy "Awesome!"
	
	run_scene :running_scenes
end

add_scene :running_scenes do
	typing_lucy "adds a couple more choices to the script."
	concerned_lucy "This last option grew really long, and now I want to add another choice inside of it.",
		"Will that work?"
	bespectacled_fairy "It would, but we have an even better option!"
	show worried_lucy
	excited_fairy "No need to worry!  This will make your job easier!"
	tired_lucy "Just what I need at 2 A.M., honestly."
	
	bespectacled_fairy "Remember the \"add_scene\" from #{em 'way'} back at the top of the script?"
	concerned_lucy "Vaguely."
	excited_fairy "It has a sister command, \"run_scene\".  Just give it the name of a scene you've added and it will jump right to that one!"
	bespectacled_fairy "Try moving all of those commands from that choice into a new script first."
	typing_lucy "Alright... I'll call it \":awesome_answer\"."
	code_block %{
		add_scene :awesome_answer do
			marcus "You really mean it?"
			jen "I do!"
			marcus "jumps up and down like a puppy."
			marcus "Then let's go get some ice cream!"
			jen "Okay!  What flavor?"
		end
	}
	amused_fairy "Yep, just like that! Now, where you had that code, you can add just #{code 'run_scene :awesome_answer'}."
	code_block %{
		choice do
			option "Look confused" do jen "Que?" end
			option "Run away" do jen "sprints off back towards the woods." end
			option "Agree" do run_scene :awesome_answer end
		end
	}
	excited_lucy "And success!  Whoohoo!"
	excited_fairy "It looks like you've really figured this out!"
	typing_lucy "You bet.  I'll have this ready for the class presentation with time to spare now."
	excited_fairy "watches on intently as #{lucy} pounds away at the keyboard."
	
	run_scene :ending
end

add_scene :ending do
	show bedroom
	
	narrate "Another couple of hours pass."
	tired_lucy "yawns."
	bespectacled_fairy "Oh, I almost forgot one of the most essential commands!"
	terrified_lucy "Ack!"
	excited_fairy "Game over!"
	terrified_lucy "Not before I finish!"
	amused_fairy "No silly, #{em 'when'} you finish."
	show tired_lucy
	bespectacled_fairy "When you reach a point where the novel should end, use the \"game_over\" command."
	tired_lucy "Oh."
	bespectacled_fairy "You can call it in three different ways:",
		"By itself, for a default ending.",
		"As #{code 'game_over :failure'} for a \"bad\" ending.",
		"Or, as #{code 'game_over :success'} for a \"good\" ending!"
	tired_lucy "I see.  I'm almost ready to use that, too.",
		"Okay, back to typing."
	
	narrate "Time passes and the earliest rays of the rising sun peek in through the curtains."
	tired_lucy "hits the \"Save\" button and then copies the files over to the school's servers."
		"Well, I think that does it."
	excited_lucy "Thanks for all the help, #{fairy}!  I couldn't have done it without you."
	default_fairy "waves.",
		"You're welcome!"
	excited_fairy "My job here is done, then!"
	default_fairy "heads for the door."
	concerned_lucy "Will I ever see you again?"
	bespectacled_fairy "Any time you need my assistance, you can count on me to be there!"
	default_lucy "Thanks again."
	default_fairy "flies out through the door."
	
	tired_lucy "looks at her books and her still-neat bed.",
		"I might as well get in a little nap..."
	excited_fairy "peeks back in, waving her pair of defibrillator paddles."
	terrified_lucy "What are you doing back here already?"
	excited_fairy "I can't let you forget about that History class assignment, now can I?"
	terrified_lucy "screams.",
		"Not another one!"
	
	narrate "Though rather frazzled, #{lucy} still passes all of her classes and manages to graduate with honors that semester, all with the help of the #{fairy} and you, too!  Thanks for playing!"
	
	game_over :success
end
