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

		speak("Ruby\'Ai Fairy", "But you must!  We fairies only last as long as you believe in us!", "images/characters/fairy_hurt.png");

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

		speak("Lucy", "So why did you go to \"[<a href=\"http://www.rubyai.org\" target=\"_blank\">http://www.rubyai.org</a>]\"?", "images/characters/lucy_confused.png");

		speak("Ruby\'Ai Fairy", "Because you need software like this to make it happen!", "images/characters/fairy_excited.png");

		speak("Lucy", "S-s-software?  How can you expect me to <em>program</em> at this hour?!", "images/characters/lucy_terrified.png");

		speak("Lucy", "Besides, does it even work on my computer?  It runs...", "images/characters/lucy_tired.png");

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

	run_scene("intro");

 } 

);

