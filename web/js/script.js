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

		game_over("failure");

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

		narrate("Over the course of the night, the dynamic duo crafts a creative masterpiece!  Lucy graduates and goes to a fulfulling career in education!");

		game_over("success");

	 } 

	)

	run_scene("intro");

 } 

);

