var rubyai_gui;
var tracked_elements = {
	"$top" : null
};

$(document).ready( function () {
	module("Basic GUI Setup");

	test("core objects", function() {
		expect(1); 
		
		rubyai_gui = new RubyAiGUI($("#rubyai-game"));
		
		ok(rubyai_gui, "The GUI engine initializes without issue.");
	} );

	var basicSetup = function() {
		tracked_elements.$top = $("#rubyai-game");
		rubyai_gui = new RubyAiGUI( tracked_elements.$top );
		rubyai_game = new RubyAiGame(function() {});
	};

	var basicTeardown = function() {
		rubyai_game = null;
		rubyai_gui = null;
	};

	function testCommands( examples ) {
		for(var scene_name in examples) {
			// Remember, function-only context
			(function(scene_name) {
			test("test command/"+scene_name, function() {
				expect(1);
				
				var contents = examples[scene_name].contents;
				var expected_output = examples[scene_name].gui_output;
				
				tracked_elements.$top = $("#rubyai-game");
				rubyai_gui = new RubyAiGUI( tracked_elements.$top );
				rubyai_game = new RubyAiGame( function() {
					this.addScene( scene_name, contents );
				} );
				
				rubyai_game.start({ scene: scene_name, gui: rubyai_gui })
				
				same(	rubyai_gui.outputAsArray(),
					expected_output,
					"Running the '"+scene_name+"' scene gives the expected GUI output."
				);
			} );
			})(scene_name);
		};
	}

	module("Script Commands - GUI Output", {
		setup: basicSetup,
		teardown: basicTeardown
	} );

	testCommands(test_data.command_examples);

	/*
	var runScene_examples = [
		{
			name: "Simple example",
			description: "runs another scene successfully",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("This is the intro scene"); },
					function() { rubyai_game.runScene("part2"); }
				] );
				this.addScene( "part2", [
					function() { rubyai_game.narrate("This is the second scene"); },
				] );
			},
			output: "This is the intro scene\nThis is the second scene\nGame Over!\n"
		},
		{
			name: "Return to original",
			description: "returns to the outer scene after finishing with the inner one",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("This is the start of the intro scene"); },
					function() { rubyai_game.runScene("part2"); },
					function() { rubyai_game.narrate("This is the end of the intro scene"); },
				] );
				this.addScene( "part2", [
					function() { rubyai_game.narrate("This is the second scene"); },
				] );
			},
			output: "This is the start of the intro scene\nThis is the second scene\nThis is the end of the intro scene\nGame Over!\n"
		},
		{
			name: "Two scenes deep",
			description: "returns to all of the outer scenes, in order, after going two scenes deep",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("This is the start of the intro scene"); },
					function() { rubyai_game.runScene("part2"); },
					function() { rubyai_game.narrate("This is the end of the intro scene"); },
				] );
				this.addScene( "part2", [
					function() { rubyai_game.narrate("This is the start of the second scene"); },
					function() { rubyai_game.runScene("part3"); },
					function() { rubyai_game.narrate("This is the end of the second scene"); },
				] );
				this.addScene( "part3", [
					function() { rubyai_game.narrate("This is the third scene"); },
				] );
			},
			output: "This is the start of the intro scene\n"+
				"This is the start of the second scene\n"+
				"This is the third scene\n"+
				"This is the end of the second scene\n"+
				"This is the end of the intro scene\nGame Over!\n"
		}
	];

	function testFullScript( command_name, examples ) {
		for(var example_index in examples) {
			// Remember, function-only context
			(function(example) {
			test("test command/"+command_name+" ("+example.name+")", function() {
				expect(1);
				
				rubyai_game = new RubyAiGame( example.contents )
				
				rubyai_game.start({	scene: example.starting_scene,
							predefined_choices: example.choices
				});
				
				same(	rubyai_game.outputAsText(),
					example.output,
					"The "+command_name+"() command "+example.description+"."
				);
			} );
			})(examples[example_index]);
		}
	};

	testFullScript("runScene", runScene_examples);

	var choice_examples = [
		{
			name: "Simple example",
			description: "prints out a full, short list of choices and the prompt",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() {
						rubyai_game.choice( [
							new Option("First Choice", [
								function() { rubyai_game.narrate("Chose First Choice") }
							])
						] );
					}
				] );
			},
			output:	"Choose:\n"+
				"(1) First Choice\nGame Over!\n"
		},
		{
			name: "Choose first",
			description: "prints out a full, short list of choices, the prompt, and then execute the first option's contents",
			starting_scene: "intro",
			choices: [1],
			contents: function() {
				this.addScene( "intro", [
					function() {
						rubyai_game.choice( [
							new Option("First Option", [
								function() { rubyai_game.narrate("Chose First Option") }
							])
						] );
					}
				] );
			},
			output:	"Choose:\n"+
				"(1) First Option\n"+
				"Chose First Option\nGame Over!\n"
		},
		{
			name: "Choose second",
			description: "prints out a full, short list of choices, the prompt, and then execute the second option's contents",
			starting_scene: "intro",
			choices: [2],
			contents: function() {
				this.addScene( "intro", [
					function() {
						rubyai_game.choice( [
							new Option("First Option", [
								function() { rubyai_game.narrate("Chose First Option") }
							]),
							new Option("Second Option", [
								function() { rubyai_game.narrate("Chose Second Option") }
							])
						] );
					}
				] );
			},
			output:	"Choose:\n"+
				"(1) First Option\n"+
				"(2) Second Option\n"+
				"Chose Second Option\nGame Over!\n"
		},
		{
			name: "Choose twice",
			description: "prints out a full list of choices, the prompt, and then execute the chosen scene's contents, then does the same for a second choice",
			starting_scene: "intro",
			choices: [1, 1],
			contents: function() {
				this.addScene( "intro", [
					function() {
						rubyai_game.choice( [
							new Option("First Option", [
								function() { rubyai_game.narrate("Chose First Option") }
							])
						] );
					},
					function() {
						rubyai_game.choice( [
							new Option("Another First Option", [
								function() { rubyai_game.narrate("Chose First Option Again") }
							])
						] );
					}
				] );
			},
			output:	"Choose:\n"+
				"(1) First Option\n"+
				"Chose First Option\n"+
				"Choose:\n"+
				"(1) Another First Option\n"+
				"Chose First Option Again\nGame Over!\n"
				
		},
	];

	testFullScript("choice", choice_examples);

	var gameOver_examples = [
		{
			name: "Quit after game over (neutral)",
			description: "causes the game to stop running the scene after the game ends",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("Before we end."); },
					function() { rubyai_game.gameOver(); },
					function() { rubyai_game.narrate("After we end."); },
				] );
			},
			output:	"Before we end.\nGame Over!\n"
		},
		{
			name: "Quit after game over (success)",
			description: "causes the game to stop running the scene after the game ends with a success",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("Before we end."); },
					function() { rubyai_game.gameOver("success"); },
					function() { rubyai_game.narrate("After we end."); },
				] );
			},
			output:	"Before we end.\nGame Over: You Win!\n"
		},
		{
			name: "Quit after game over (failure)",
			description: "causes the game to stop running the scene after the game ends with a failure",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("Before we end."); },
					function() { rubyai_game.gameOver("failure"); },
					function() { rubyai_game.narrate("After we end."); },
				] );
			},
			output:	"Before we end.\nGame Over: You Lose!\n"
		},
	];

	testFullScript("gameOver", gameOver_examples);

	test("test command/gameOver (Game Over only ends the game itself)", function() {
		expect(1);
		
		rubyai_game = new RubyAiGame( function() {
			this.addScene( "intro", [
				function() { rubyai_game.narrate("Before game over."); },
				function() { rubyai_game.gameOver(); }
			] )
		} );
		
		rubyai_game.start( { scene: "intro" } );
		rubyai_game.output += "After game over.\n";
		
		same(	rubyai_game.outputAsText(),
			"Before game over.\nGame Over!\nAfter game over.\n",
			"The rest of the Javascript runs after RubyAiGame.gameOver()."
		);
	} );

	test("test command/gameOver (Game Over only ends the game itself after a choice)", function() {
		expect(1);
		
		rubyai_game = new RubyAiGame( function() {
			this.addScene( "intro", [
				function() { rubyai_game.narrate("Before game over."); },
				function() { rubyai_game.choice( [
					new Option( 
						"First Option",
						[function() { rubyai_game.narrate("Chose the first option."); }]
					),
				] ) },
				function() { rubyai_game.gameOver(); }
			] )
		} );
		
		rubyai_game.start( { scene: "intro", predefined_choices: [1] } );
		rubyai_game.output += "After game over.\n";
		
		same(	rubyai_game.outputAsText(),
			"Before game over.\nChoose:\n(1) First Option\nChose the first option.\nGame Over!\nAfter game over.\n",
			"The rest of the Javascript runs after RubyAiGame.gameOver()."
		);
	} );

	test("test command/gameOver (Call a neutral Game Over automatically if we run out of script)", function() {
		expect(1);
		
		rubyai_game = new RubyAiGame( function() {
			this.addScene( "intro", [
				function() { rubyai_game.narrate("Example command."); },
				// The intentionally-removed command: function() { rubyai_game.gameOver(); }
			] )
		} );
		
		rubyai_game.start( { scene: "intro" } );
		
		same(	rubyai_game.outputAsText(),
			"Example command.\nGame Over!\n",
			"The rest of the Javascript runs after RubyAiGame.gameOver()."
		);
	} );
	*/
});
