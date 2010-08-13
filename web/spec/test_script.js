var rubyai_script = new RubyAiScript( rubyai_game,
 function() {
	this.addScene("intro", [
		function() { rubyai_game.show_stage("bedroom", "Bedroom", "images/stages/bedroom_default.png", "Somewhere underneath piles of clothes and stuffed animals lies a bed, or so my mom keeps telling me.  If not for the closet and my computer desk, you might not realize that you were in my bedroom."); },
		function() { rubyai_game.sound("Click"); },
		function() { rubyai_game.speak("Lucy", "Phew!  Gym class sucks!  At least I lasted all the way through.", "images/characters/lucy_tired.png"); },
		function() { rubyai_game.narrate("The hours fly by as she types, the essays practically pouring out of her fingers and into the keyboard."); },
		function() { rubyai_game.action("Lucy", "yawns.", "images/characters/lucy_tired.png"); },
		function() { rubyai_game.speak("Lucy", "Just one more assigment...", "images/characters/lucy_tired.png"); },
		function() { rubyai_game.show_character("lucy", "Lucy", "images/characters/lucy_annoyed.png", ""); },
		function() { rubyai_game.run_scene("very_first_choice"); },
	] );
	this.addScene("very_first_choice", [
		function() { rubyai_game.show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_pleased.png", ""); },
		function() { rubyai_game.speak("Lucy", "Who the heck are you?", "images/characters/lucy_terrified.png"); },
		function() { rubyai_game.speak("Ruby\'Ai Fairy", "You don\'t recognize your own Ruby\'Ai Fairy?", "images/characters/fairy_hurt.png"); },
		function() { rubyai_game.choose_from( [
			new Option("Believe in the Ruby\'Ai Fairy", [
				function() {
					 rubyai_game.action("Lucy", "dwells on the option", "images/characters/lucy_terrified.png");
				},
				function() {
					 rubyai_game.run_scene("believe");
				}
			]),
			new Option("Disbelieve in the Ruby\'Ai Fairy", [ function() { rubyai_game.run_scene("disbelieve"); }]),
		] ) },
		function() { rubyai_game.speak("Lucy", "Now what do we do?", "images/characters/lucy_terrified.png"); },
	] );
	this.addScene("disbelieve", [
		function() { rubyai_game.narrate("With a horrible scream, the Ruby\'Ai Fairy vanishes in a cloud of sparkles."); },
		function() { rubyai_game.action("Lucy", "spends the rest of the night researching \"Hallucinations\" and local folklore on AltMed and Wikipedia instead of finishing her homework.  Exhausted, she sleeps in late, missing the class entirely and forced into another year of classes and student loans.", "images/characters/lucy_terrified.png"); },
		function() { rubyai_game.choose_from( [
			new Option("Try that first choice again?", [ function() { rubyai_game.run_scene("very_first_choice"); } ] ),
			new Option("Quit now", [ function() { rubyai_game.game_over("failure"); } ]),
		] ) },
	] );
	this.addScene("believe", [
		function() { rubyai_game.show_character("fairy", "Ruby\'Ai Fairy", "images/characters/fairy_excited.png", ""); },
		function() { rubyai_game.show_character("lucy", "Lucy", "images/characters/lucy_tired.png", ""); },
		function() { rubyai_game.speak("Ruby\'Ai Fairy", "You do believe, you do!  I can feel it.  I\'ll earn my Fairy Wand yet!", "images/characters/fairy_excited.png"); },
	] );
 } 
);

console.log(rubyai_script);
console.log(rubyai_game.scenes);
console.log(rubyai_game.current_crawler);
console.log(rubyai_game.current_crawler.parent_crawler == null);

while(rubyai_game.current_crawler.advanceScript()) {
	// pass
}
