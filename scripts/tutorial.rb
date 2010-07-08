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

for_stages do
	add :bedroom do
		describe_as "Somewhere underneath piles of clothes and stuffed animals lies a bed, or so my mom keeps telling me.  If not for the closet and my computer desk, you might not realize that you were in my bedroom."
	end
end

# Character and stage images are added automatically based on the /images/ directory structure.
# e.g. `lucy :smiles` looks for /images/characters/lucy/smiles.png,
# `stage :bedroom` looks for /images/stages/bedroom.png, and
# `stage :bedroom, :on_fire` looks for /images/stages/bedroom/on_fire.png

add_scene :opening do
	show bedroom
	
	# Sounds will play an audio file and display the text as "*<sound>*" by default
	sound click, "Click"
	
	# The command `<character> "string"` makes the character say or do something, depending on the
	# capitalization of the first letter (uppercase -> statement, lowercase -> action).
	show lucy :tired
	lucy "Phew!  Gym class sucks!  At least I lasted all the way through."
	lucy "sighs as she tosses her backpack aside."
	
	# Use `<character> says "statement"` or `character thusly "does something"` if you need explicit 
	# commands
	show lucy :excited
	lucy says "Now for my homework, then sleep!"
	lucy thusly "flops onto her chair."
	
	narrate "The hours fly by as she types, the essays practically pouring out of her fingers and into the keyboard.",
		"Hitting Ctrl-P just as the sun finishes setting, #{lucy} starts nodding off as the churning of the printer serenades her."
	
	show lucy :tired
	lucy "yawns."
	lucy "Just one more assigment..."
	
	show lucy :terrified
	lucy "Ahhhh!",
	     "My art class assignment!"
	
	hidden_fairy "Don't forget about it!"
	show lucy :mortified
	lucy "I can't graduate unless I pass!",
	     "Why did I ever take that elective?  I'm an English major!"
	hidden_fairy "You can't graduate without it!"
	
	show lucy :annoyed
	lucy "I know!",
	     "I just said that!"
	
	show fairy :pleased
	show lucy :terrified
	lucy "Who the heck are you?"
	
	show fairy :hurt
	fairy "You don't recognize your own Ruby'Ai Fairy?"
	show lucy :tired
	lucy "You really want me to believe that?  Seriously?"
	fairy "But you must!  We fairies only last as long as you believe in us!"
	
	choice do
		option "Believe in the #{fairy}" do run_scene :believe end
		option "Disbelieve in the #{fairy}" do run_scene :disbelieve end
	end
end

add_scene :disbelieve do
	show lucy :thinking
	show fairy :terrified
	
	narrate "Thinking back to her Intro to Psychology Class, #{lucy} empties her mind, focusing all of her skepticism on the floating figure before her."
	
	sound poof
	show fairy :exploding
	hide fairy
	show lucy :terrified
	
	narrate "With a horrible scream, the #{fairy} vanishes in a cloud of sparkles."
	lucy "spends the rest of the night researching \"Hallucinations\" and local folklore on AltMed and Wikipedia, respectively, instead of finishing her homework.  Exhausted, she sleeps in fails the class."
	
	gave_over :fail
end

add_scene :believe do
	show fairy :excited
	show lucy :tired
	fairy "You do believe, you do!  I can feel it.  I'll earn my Fairy Wand yet!"
	lucy "You don't even have your want yet?  Are you kidding me?"
	
	show fairy :stern
	fairy "And you still don't have your art class assignment."
	show lucy :terrified
	lucy "Riiight."
	
	# And more stuff happens...
end

run_scene :intro

