for_characters do
	add :lucy, "Lucy"
	add :fairy, "Ruby'Ai Fairy" do
		# Pseudonyms let you refer to this character by other names both in commands and with 
		# different names in the novel text
		# TODO: Consider adding this feature back in when it offers a real benefit beyond 
		# just add a new character
		# pseudonym :hidden_fairy, "????"
	end
	add :hidden_fairy, "????"
end

for_sounds do
	add :click, "Click"
	add :poof, "Poof"
end

for_stages do
	add :bedroom, "Bedroom" do
		describe_as "Somewhere underneath piles of clothes and stuffed animals lies a bed, or so my mom keeps telling me.  If not for the closet and my computer desk, you might not realize that you were in my bedroom."
	end
end

# Character and stage images are added automatically based on the /images/ directory structure.
# e.g. `lucy :smiles` looks for /images/characters/lucy/smiles.png,
# `stage :bedroom` looks for /images/stages/bedroom.png, and
# `stage :bedroom, :on_fire` looks for /images/stages/bedroom/on_fire.png

add_scene :opening do
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
	
	show pleased_fairy
	terried_lucy "Who the heck are you?"
	
	hurt_fairy "You don't recognize your own Ruby'Ai Fairy?"
	tired_lucy "You really want me to believe that?  Seriously?"
	fairy "But you must!  We fairies only last as long as you believe in us!"
	
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
	
	game_over :failure
end

add_scene :believe do
	show excited_fairy
	show tired_lucy
	fairy "You do believe, you do!  I can feel it.  I'll earn my Fairy Wand yet!"
	lucy "You don't even have your want yet?  Are you kidding me?"
	
	stern_fairy "And you still don't have your art class assignment."
	terrified_lucy "Riiight."
	
	narrate "Over the course of the night, the dynamic duo crafts a creative masterpiece!  #{lucy} graduates and goes to a fulfulling career in education!"
	
	game_over :success
end

run_scene :opening
