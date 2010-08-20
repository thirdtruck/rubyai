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
	
	function testScript( label, scene_name, contents, expected_output ) {
		test(label, function() {
			tracked_elements.$top = $("#rubyai-game");
			rubyai_gui = new RubyAiGUI( tracked_elements.$top );
			rubyai_game = new RubyAiGame( contents );
			
			rubyai_game.start({ scene: scene_name, gui: rubyai_gui })
			
			if (typeof expected_output === "string") {
				same(	
					expected_output,
					tracked_elements.$top.html(),
					"Received the expected GUI output"
				);
			} else {
				var $total_gui_output = tracked_elements.$top.children();
				
				same(
					expected_output.length,
					$total_gui_output.length,
					"The total output of the GUI element has the same element count as the expected output"
				);
				
				for(var output_index = 0; output_index < expected_output.length; output_index += 1) {
					// TODO: Find a more efficient way of comparing total HTML output
					var $gui_output = $('<div/>').append( $total_gui_output.eq(output_index).clone() ).html();
					
					same(	
						$gui_output,
						expected_output[output_index],
						"Received the expected GUI output for line "+output_index
					);
				}
			}
		} );
	};
	
	function testScenes( examples ) {
		for(var set_name in examples) {
			(function(scene_name) {
				expect(1);
				
				var example = examples[set_name];
				
				testScript(
					"test scenes/" + set_name,
					"intro",
					example.contents,
					example.gui_output
				);
			})(set_name);
		};
	};

	function testCommand( scene_name, example ) {
		// Remember, function-only context
		(function(scene_name) {
			expect(1);
			
			var contents = example.contents;
			var expected_output = example.gui_output.join('');
			
			testScript(
				"test command/"+scene_name,
				scene_name,
				function () {
					this.addScene( scene_name, contents );
				},
				expected_output
			);
		})(scene_name);
	};

	function testCommands( examples ) {
		for(var scene_name in examples) {
			testCommand( scene_name, examples[scene_name] );
		};
	};

	module("Script Commands - GUI Output", {
		setup: basicSetup,
		teardown: basicTeardown
	} );

	testCommands(test_data.command_examples);

	testScenes(test_data.runScene_examples);

	/*
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
