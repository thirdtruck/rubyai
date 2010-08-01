rubyai_script = new RubyAiScript(

 function() {

	intro();

	add_scene("intro",

	 function() {

		show_stage("bedroom", "Bedroom", "images/stages/bedroom_default.png", "Somewhere underneath piles of clothes and stuffed animals lies a bed, or so my mom keeps telling me.  If not for the closet and my computer desk, you might not realize that you were in my bedroom.");

		sound("Click");

		speak("Lucy", "Phew!  Gym class sucks!  At least I lasted all the way through.", "images/characters/lucy_tired.png");

		action("Lucy", "sighs as she tosses her backpack aside.", "images/characters/lucy_tired.png");

		speak("Lucy", "Now for my homework, then sleep!", "images/characters/lucy_excited.png");

		action("Lucy", "flops onto her chair.", "images/characters/lucy_excited.png");

		narrate("The hours fly by as she types, the essays practically pouring out of her fingers and into the keyboard.");

		narrate("Hitting Ctrl-P just as the sun finishes setting, Lucy starts nodding off as the churning of the printer serenades her.");

		action("Lucy", "yawns.", "images/characters/lucy_tired.png");

		speak("Lucy", "Just one more assigment...", "images/characters/lucy_tired.png");

		speak("Lucy", "Ahhhh!", "images/characters/lucy_terrified.png");

		speak("Lucy", "My art class assignment!", "images/characters/lucy_terrified.png");

		speak("????", "Don\'t forget about it!", "images/characters/hidden_fairy_default.png");

		speak("Lucy", "I can\'t graduate unless I pass!", "images/characters/lucy_mortified.png");

		speak("Lucy", "Why did I ever take that elective?  I\'m an English major!", "images/characters/lucy_mortified.png");

		speak("????", "You can\'t graduate without it!", "images/characters/hidden_fairy_default.png");

		show_character("lucy", "Lucy", "images/characters/lucy_annoyed.png", "");

		speak("Lucy", "I know!", "images/characters/lucy_annoyed.png");

		speak("Lucy", "I just said that!", "images/characters/lucy_annoyed.png");

		run_scene("very_first_choice");

	 } 

	)

	add_scene("very_first_choice",

	 function() {

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_pleased.png", "");

		speak("Lucy", "Who the heck are you?", "images/characters/lucy_terrified.png");

		speak("Ruby\'Ai Fairy", "You don\'t recognize your own Ruby\'Ai Fairy?", "images/characters/fairy_hurt.png");

		speak("Lucy", "You really want me to believe that?  Seriously?", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "But you must!  We fairies only last as long as you believe in us!", "images/characters/fairy_terrified.png");

		choose_from( new Choice( [

		new Option("Believe in the Ruby\'Ai Fairy",

		 function() {

			run_scene("believe");

		 } 

		),

		new Option("Disbelieve in the Ruby\'Ai Fairy",

		 function() {

			run_scene("disbelieve");

		 } 

		),

		] ) );

	 } 

	)

	add_scene("disbelieve",

	 function() {

		show_character("lucy", "Lucy", "images/characters/lucy_thinking.png", "");

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_terrified.png", "");

		narrate("Thinking back to her Intro to Psychology Class, Lucy empties her mind, focusing all of her skepticism on the floating figure before her.");

		sound("Poof");

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_exploding.png", "");

		hide("Ruby\'Ai Fairy");

		show_character("lucy", "Lucy", "images/characters/lucy_terrified.png", "");

		narrate("With a horrible scream, the Ruby\'Ai Fairy vanishes in a cloud of sparkles.");

		action("Lucy", "spends the rest of the night researching \"Hallucinations\" and local folklore on AltMed and Wikipedia instead of finishing her homework.  Exhausted, she sleeps in late, missing the class entirely and forced into another year of classes and student loans.", "images/characters/lucy_terrified.png");

		choose_from( new Choice( [

		new Option("Try that first choice again?",

		 function() {

			run_scene("very_first_choice");

		 } 

		),

		new Option("Quit now",

		 function() {

			game_over("failure");

		 } 

		),

		] ) );

	 } 

	)

	add_scene("believe",

	 function() {

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_excited.png", "");

		show_character("lucy", "Lucy", "images/characters/lucy_tired.png", "");

		speak("Ruby\'Ai Fairy", "You do believe, you do!  I can feel it.  I\'ll earn my Fairy Wand yet!", "images/characters/fairy_excited.png");

		speak("Lucy", "You don\'t even have your wand yet?  Are you kidding me?", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "And you still don\'t have your art class assignment.", "images/characters/fairy_stern.png");

		speak("Lucy", "Riiight.", "images/characters/lucy_terrified.png");

		run_scene("install");

	 } 

	)

	add_scene("install",

	 function() {

		show_stage("computer_desk", "Computer Desk", "images/stages/computer_desk_default.png", "My relic of a computer, inherited from my father.  He already wore the \'E\' key down to a nub from years of editing.");

		speak("Lucy", "So what do we do now, Miss Ruby\'Ai Fairy?", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "Now I get to help you write a novel!", "images/characters/fairy_stern.png");

		show_character("lucy", "Lucy", "images/characters/lucy_tired.png", "");

		speak("Lucy", "That doesn\'t help me in the <strong>slightest</strong>!", "images/characters/lucy_terrified.png");

		speak("Lucy", "I would have written one already if I thought that my <em>art</em> teacher would accept it.", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "What about a <em>visual</em> novel?", "images/characters/fairy_bemused.png");

		speak("Lucy", "Eh?", "images/characters/lucy_tired.png");

		action("Ruby\'Ai Fairy", "types a URL into Lucy\'s browser.", "images/characters/fairy_typing.png");

		speak("Ruby\'Ai Fairy", "They call them \"Ren\'Ai\" in Japan!  It uses pictures <em>and</em> words to create a whole new experience!", "images/characters/fairy_typing.png");

		speak("Lucy", "You said \"Ren\'Ai\" --", "images/characters/lucy_confused.png");

		speak("Ruby\'Ai Fairy", "That I did!", "images/characters/fairy_excited.png");

		speak("Lucy", "That you did.", "images/characters/lucy_tired.png");

		speak("Lucy", "So why did you go to \"[<a href=\"http://www.rubyai.org\" target=\"_blank\">http://www.rubyai.org</a>]\"?", "images/characters/lucy_questioning.png");

		speak("Ruby\'Ai Fairy", "Because you need software like this to make it happen!", "images/characters/fairy_excited.png");

		speak("Lucy", "S-s-software?  How can you expect me to <em>program</em> at this hour?!", "images/characters/lucy_terrified.png");

		speak("Lucy", "Besides...", "images/characters/lucy_tired.png");

		speak("Lucy", "Does it even work on my computer?  It runs...", "images/characters/lucy_questioning.png");

		run_scene("choose_os");

	 } 

	)

	add_scene("choose_os",

	 function() {

		choose_from( new Choice( [

		new Option("Linux",

		 function() {

			run_scene("install_linux");

		 } 

		),

		new Option("Windows",

		 function() {

			run_scene("install_windows");

		 } 

		),

		new Option("Mac OS X",

		 function() {

			run_scene("install_osx");

		 } 

		),

		new Option("In the Browser",

		 function() {

			run_scene("install_browser");

		 } 

		),

		] ) );

		narrate("With a little help from the <a href=\"http://www.rubyai.org/message_boards\" target=\"_blank\">message boards</a>, Lucy and the Ruby\'Ai Fairy soon have the <em>Ruby\'Ai</em> software up and running.");

		speak("Ruby\'Ai Fairy", "And now we go to the project directory we made... \"my_first_renai\"...", "images/characters/fairy_typing.png");

		speak("Lucy", "Did everything work?", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "It sure did!", "images/characters/fairy_excited.png");

		speak("Lucy", "Egads!  Look at all those directories!", "images/characters/lucy_terried.png");

		speak("Lucy", "\"bin\", \"lib\", \"web\", what does it all <em>meeeeeean!?</em>", "images/characters/lucy_terried.png");

		speak("Lucy", "...", "images/characters/lucy_soulless.png");

		speak("Ruby\'Ai Fairy", "Don\'t die on me now!", "images/characters/fairy_frantic.png");

		speak("Lucy", "Get away from me with those paddles!", "images/characters/lucy_terrified.png");

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_apologetic.png", "");

		action("Lucy", "types away at the computer, one key at a time.", "images/characters/lucy_tired.png");

		run_scene("command_line_setup");

		run_scene("first_script");

	 } 

	)

	add_scene("install_linux",

	 function() {

		speak("Ruby\'Ai Fairy", "It sure does!", "images/characters/fairy_excited.png");

	 } 

	)

	add_scene("install_windows",

	 function() {

		speak("Ruby\'Ai Fairy", "You bet it does!", "images/characters/fairy_excited.png");

	 } 

	)

	add_scene("install_osx",

	 function() {

		speak("Ruby\'Ai Fairy", "It even runs on that!", "images/characters/fairy_excited.png");

	 } 

	)

	add_scene("install_browser",

	 function() {

		speak("Ruby\'Ai Fairy", "You can even try it out in your browser!", "images/characters/fairy_excited.png");

	 } 

	)

	add_scene("command_line_setup",

	 function() {

		speak("Lucy", "Okay, Miss Ruby\'Ai Fairy, what do I do now?", "images/characters/lucy_default.png");

		speak("Ruby\'Ai Fairy", "Let me see.. its says that you should, after installing the software...", "images/characters/fairy_bespectacled.png");

		speak("Lucy", "You\'re still reading the manual?", "images/characters/lucy_tired.png");

		action("Lucy", "stares at the screen.", "images/characters/lucy_confused.png");

		choose_from( new Choice( [

		new Option("media",

		 function() {

			run_scene("directory_media");

		 } 

		),

		new Option("web",

		 function() {

			run_scene("directory_web");

		 } 

		),

		new Option("scripts",

		 function() {

			run_scene("directory_scripts");

		 } 

		),

		] ) );

	 } 

	)

	add_scene("directory_media",

	 function() {

		action("Ruby\'Ai Fairy", "looks up from the book.", "images/characters/fairy_bespectacled.png");

		speak("Ruby\'Ai Fairy", "You can\'t go in there!", "images/characters/fairy_terrified.png");

		action("Lucy", "opens the directory accidentially.", "images/characters/lucy_confused.png");

		speak("Lucy", "Wait, what\'s this \"lucy.png\" image...?", "images/characters/lucy_worried.png");

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_terrified.png", "");

		speak("Lucy", "It\'s a picture of <em>me</em>!  I\'m looking at a picture of me, looking at a picture of me, of me, of me...", "images/characters/lucy_terrified.png");

		narrate("Lucy\'s universe segfaults from the recursive loop and implodes.");

		choose_from( new Choice( [

		new Option("Try that again?",

		 function() {

			run_scene("command_line_setup");

		 } 

		),

		new Option("Quit now",

		 function() {

			game_over("failure");

		 } 

		),

		] ) );

	 } 

	)

	add_scene("directory_web",

	 function() {

		speak("Lucy", "It\'s empty!", "images/characters/lucy_terrified.png");

		speak("Ruby\'Ai Fairy", "What\'s empty?!", "images/characters/fairy_confused.png");

		speak("Lucy", "The \"web\" directory!", "images/characters/lucy_indignant.png");

		speak("Ruby\'Ai Fairy", "Oh, that\'s perfectly normal.", "images/characters/fairy_bemused.png");

		speak("Lucy", "What the heck do you expect me to do with an empty directory?", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "Nothing yet.  <em>Ruby\'Ai</em> will put all of the actual game file after we export the finished project!", "images/characters/fairy_default.png");

		speak("Lucy", "Oh.", "images/characters/lucy_tired.png");

		speak("Lucy", "So where do I go?", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "To the \"scripts\" directory!", "images/characters/fairy_excited.png");

		show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_typing.png", "");

		run_scene("directory_scripts");

	 } 

	)

	add_scene("directory_scripts",

	 function() {

		speak("Lucy", "It\'s empty.", "images/characters/lucy_confused.png");

		speak("Ruby\'Ai Fairy", "Oh, we just need to run the script setup command!", "images/characters/fairy_default.png");

		speak("Lucy", "I have to type all of that out correctly...", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "Just this once!", "images/characters/fairy_excited.png");

		speak("Lucy", "If you say so...", "images/characters/lucy_typing.png");

		speak("Lucy", "Ah, an error!  Did I <em>break</em> it?  Tell me I didn\'t break it!", "images/characters/lucy_terrified.png");

		speak("Ruby\'Ai Fairy", "Don\'t worry!", "images/characters/fairy_excited.png");

		speak("Ruby\'Ai Fairy", "You can try it again.", "images/characters/fairy_excited.png");

		speak("Ruby\'Ai Fairy", "I have confidence in you!", "images/characters/fairy_excited.png");

		speak("Lucy", "...", "images/characters/lucy_typing.png");

		speak("Lucy", "Oh!  I forgot a period.", "images/characters/lucy_typing.png");

		show_character("lucy", "Lucy", "images/characters/lucy_gasping.png", "");

		speak("Lucy", "It works!", "images/characters/lucy_gasping.png");

		speak("Ruby\'Ai Fairy", "It works!", "images/characters/fairy_excited.png");

	 } 

	)

	add_scene("initialize_in_browser",

	 function() {

		speak("Ruby\'Ai Fairy", "I can\'t reach the site!", "images/characters/fairy_terrified.png");

		action("Lucy", "pulls the keyboard over.", "images/characters/lucy_tired.png");

		speak("Lucy", "Let\'s just install a local copy.", "images/characters/lucy_tired.png");

		run_scene("choose_os");

	 } 

	)

	add_scene("first_script",

	 function() {

		speak("Lucy", "So what do I do now?", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "Now we open up the scripts/my_first_renai/scenes.rb file!", "images/characters/fairy_bespectacled.png");

		speak("Lucy", "Okay...", "images/characters/lucy_worried.png");

		speak("Lucy", "It says:", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "That\'s right!  <em>Ruby\'Ai</em> always runs the \"intro\" scene first, if you add one, so it makes one for you automagically!", "images/characters/fairy_excited.png");

		speak("Lucy", "What\'s this \"test_run.rb\" file?", "images/characters/lucy_worried.png");

		show_character("lucy", "Lucy", "images/characters/lucy_typing.png", "");

		speak("Lucy", "Ugh, another error.", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "This one has its own instructions!  If you don\'t know what a script does, trying running it and see if it offers any help of its own!", "images/characters/fairy_excited.png");

		speak("Lucy", "I see now...  ...", "images/characters/lucy_typing.png");

		speak("Lucy", "And success!  Marcus said \"Hello!\"", "images/characters/lucy_excited.png");

		speak("Lucy", "I think I can actually make this happen.  This girl will graduate this semester yet.", "images/characters/lucy_excited.png");

		run_scene("first_changes");

	 } 

	)

	add_scene("first_changes",

	 function() {

		speak("Lucy", "Okay, now what?  We need more than just this Marcus person standing there.", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "I don\'t know about that; he <em>is</em> pretty handsome.", "images/characters/fairy_bespectacled.png");

		speak("Lucy", "Focus!", "images/characters/lucy_furious.png");

		action("Ruby\'Ai Fairy", "tumbles backwards into a heap of library books.", "images/characters/fairy_terrified.png");

		speak("Ruby\'Ai Fairy", "Okay!  Focusing!", "images/characters/fairy_surrendered.png");

		action("Ruby\'Ai Fairy", "flies back over to the computer.", "images/characters/fairy_default.png");

		speak("Ruby\'Ai Fairy", "How about we have him wave?", "images/characters/fairy_bemused.png");

		speak("Lucy", "And how do we do that?", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "Try this: .", "images/characters/fairy_bespectacled.png");

		speak("Lucy", "...", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "Yes?  What?  Is there something on my face?", "images/characters/fairy_worried.png");

		speak("Ruby\'Ai Fairy", "Don\'t tell me that I have a bookworm on my face!", "images/characters/fairy_terrified.png");

		action("Ruby\'Ai Fairy", "tries desperately to wipe her face on Lucy\'s shirt before the girl pulls her off of it.", "images/characters/fairy_terrified.png");

		speak("Lucy", "No, not that.  It\'s just that \"thusy\" isn\'t grammatically correct here.", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "Oh thank the novella authors.  Feral bookworms constitute a leading cause of fairy death in this country.  Did you know that?", "images/characters/fairy_distracted.png");

		speak("Lucy", "That I did not.  But back to \"thusly\"?", "images/characters/lucy_tired.png");

		action("Ruby\'Ai Fairy", "swats something.", "images/characters/fairy_focused.png");

		speak("Ruby\'Ai Fairy", "There.", "images/characters/fairy_focused.png");

		speak("Ruby\'Ai Fairy", "Oh!  I actually remember that from my time in Fairy University!", "images/characters/fairy_excited.png");

		speak("Lucy", "You do?  Wait, from where?", "images/characters/lucy_confused.png");

		speak("Ruby\'Ai Fairy", "Yep!  The teacher mentioned a  \"language keyword conflict\" or something...", "images/characters/fairy_bespectacled.png");

		speak("Lucy", "And?", "images/characters/lucy_worried.png");

		speak("Ruby\'Ai Fairy", "And then I dozed off again.", "images/characters/fairy_tired.png");

		speak("Lucy", "...", "images/characters/lucy_furious.png");

		speak("Ruby\'Ai Fairy", "But I\'ve seen your art teacher\'s assignment handouts and I doubt he\'d notice!", "images/characters/fairy_bemused.png");

		speak("Ruby\'Ai Fairy", "Besides, you don\'t have to use that word anyways!", "images/characters/fairy_bemused.png");

		speak("Lucy", "Now you tell me?", "images/characters/lucy_tired.png");

		speak("Ruby\'Ai Fairy", "That\'s right!  <em>Ruby\'Ai</em> will deduce your intent from what you type!", "images/characters/fairy_excited.png");

		speak("Lucy", "How so?", "images/characters/lucy_wary.png");

		speak("Ruby\'Ai Fairy", "If the sentence starts with a lowercase letter, <em>Ruby\'Ai</em> treats it as if you typed \"thusly\".  Otherwise, it acts as if you used \"says\"!", "images/characters/fairy_bespectacled.png");

		speak("Lucy", "So if I add this to what we already have...", "images/characters/lucy_typing.png");

		action("Lucy", "runs the script again and this pops up on the screen:", "images/characters/lucy_typing.png");

		action("Ruby\'Ai Fairy", "claps!", "images/characters/fairy_excited.png");

		action("Lucy", "cheers!", "images/characters/lucy_excited.png");

		narrate("A woman shouts from downstairs.");

