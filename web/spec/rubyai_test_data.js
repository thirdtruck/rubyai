var export_data = {
	gui : {
		game_over : {
			success : "<div class=\"game-over success\">Game Over!  You Win!</div>",
			failure : "<div class=\"game-over failure\">Game Over!  You Lose!</div>",
			neutral : "<div class=\"game-over neutral\">Game Over!</div>"
		}
	},
	
};

var getOptionLink = function(link_index) {
	return $('#rubyai-game').find(".option:eq(" + (link_index) + ") a");
};

var test_data  = {
	example_scenes : {
		empty: [],
		one_step: [function() { }],
		one_command: [{ type: "command", content: function() { rubyai_game.narrate("Stuff happens"); } }],
		two_commands: [
			{ type: "command", content: function() { rubyai_game.narrate("Stuff happens"); } },
			{ type: "command", content: function() { rubyai_game.narrate("More stuff happens"); } }
		]
	},
	command_examples : {
		narrate: { contents: [{ type: "command", content: function() { rubyai_game.narrate("Stuff happens"); } }],
			text_output: "Stuff happens\nGame Over!\n",
			gui_output: ["<div class=\"narration\">Stuff happens</div>", export_data.gui.game_over.neutral]
		},
		speak: { contents: [{ type: "command", content: function() { rubyai_game.speak("Lucy", "I have something to say.") } }],
			text_output: "Lucy: I have something to say.\nGame Over!\n",
			gui_output: ["<div class=\"speech\"><span class=\"character\">Lucy:</span><span class=\"statement\">I have something to say.</span></div>", export_data.gui.game_over.neutral]
		},
		action: { contents: [{ type: "command", content: function() { rubyai_game.action("Lucy", "does something.") } }],
			text_output: "Lucy does something.\nGame Over!\n",
			gui_output: ["<div class=\"action\"><span class=\"character\">Lucy</span> <span class=\"behavior\">does something.</span></div>", export_data.gui.game_over.neutral]
		},
		sound: { contents: [{ type: "command", content: function() { rubyai_game.sound("bang", "Bang") } }],
			text_output: "*Bang*\nGame Over!\n",
			gui_output: ["<div class=\"sound\">Bang</div>", export_data.gui.game_over.neutral]
		},
		showStage: { contents: [{ type: "command", content: function() { rubyai_game.showStage("outdoors", "Outdoors", "images/stages/outdoors_default.png", "The outdoors, where they keep all of the trees.") } }],
			text_output: "Show stage Outdoors [outdoors]: The outdoors, where they keep all of the trees.\nGame Over!\n",
			gui_output: ["<div class=\"stage-summary\"><div class=\"title\">Outdoors</div><div class=\"description\">The outdoors, where they keep all of the trees.</div></div>", export_data.gui.game_over.neutral]
		},
		showCharacter: { contents: [{ type: "command", content: function() { rubyai_game.showCharacter("lucy", "Lucy", "lucy_default.png", "Our protagonist") } }],
			text_output: "Show character Lucy [lucy]: lucy_default.png\nGame Over!\n",
			gui_output: ["<div class=\"character-summary\"><div class=\"name\">Lucy</div><div class=\"description\">Our protagonist</div></div>", export_data.gui.game_over.neutral]
		},
		hide: { contents: [{ type: "command", content: function() { rubyai_game.hide("lucy", "Lucy") } }],
			text_output: "[Hide Lucy]\nGame Over!\n",
			gui_output: ["<div class=\"event\">[Hide Lucy]</div>", export_data.gui.game_over.neutral]
		},
		codeBlock: { contents: [{ type: "command", content: function() { rubyai_game.codeBlock("\tline_one();\n\tline_two();") } }],
			text_output: "CODE>>>\n\tline_one();\n\tline_two();\n<<<CODE\nGame Over!\n",
			gui_output: ["<pre class=\"code-block\">\tline_one();\n\tline_two();</pre>", export_data.gui.game_over.neutral]
		},
		gameOver_neutral: { contents: [{ type: "command", content: function() { rubyai_game.gameOver() } }],
			text_output: "Game Over!\n",
			gui_output: [export_data.gui.game_over.neutral]
		},
		gameOver_success: { contents: [{ type: "command", content: function() { rubyai_game.gameOver("success") } }],
			text_output: "Game Over: You Win!\n",
			gui_output: [export_data.gui.game_over.success]
		},
		gameOver_failure: { contents: [{ type: "command", content: function() { rubyai_game.gameOver("failure") } }],
			text_output: "Game Over: You Lose!\n",
			gui_output: [export_data.gui.game_over.failure]
		},
		single_option: { contents: [{ type: "choice", content: function() {
				rubyai_game.choice( [
					new Option("First Option", { type: "command", content: function() {
						rubyai_game.narrate("Chose the first option.");
					}})
				] );
			}}],
			text_output: "Choose:\n(1) First Option\n",
			gui_output: [
				"<div class=\"choice\">Choose:<div class=\"option\"><a href=\"#\"><span class=\"index\">(1)</span> First Option</a></div></div>"
				// Note the *lack* of a "Game Over" result
			]
		},
		two_options: { contents: [{ type: "choice", content: function() {
				rubyai_game.choice( [
					new Option("First Option", {
						type: "command",
						content: function() {
							rubyai_game.narrate("Chose the first option.");
						}
					}),
					new Option("Second Option", {
						type: "command",
						content: function() {
							rubyai_game.narrate("Chose the second option.");
						}
					}),
				] );
			}}],
			text_output: "Choose:\n(1) First Option\n(1) Second Option\n",
			gui_output: [
				"<div class=\"choice\">Choose:" +
					"<div class=\"option\"><a href=\"#\"><span class=\"index\">(1)</span> First Option</a></div>" +
					"<div class=\"option\"><a href=\"#\"><span class=\"index\">(2)</span> Second Option</a></div>" +
					"</div>"
				// Note the *lack* of a "Game Over" result
			]
		},
			//text_output: "Choose:\n(1) First Option\nChose the first option.\n",
	},
	runScene_examples : {
		simple : {
			name: "Simple example",
			description: "runs another scene successfully",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the intro scene"); } },
					{ type: "command", content: function() { rubyai_game.runScene("part2"); } }
				] );
				this.addScene( "part2", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the second scene"); } },
				] );
			},
			text_output: "This is the intro scene\nThis is the second scene\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">This is the intro scene</div>",
				"<div class=\"narration\">This is the second scene</div>",
				export_data.gui.game_over.neutral
			]
		},
		return_to_original : {
			name: "Return to original",
			description: "returns to the outer scene after finishing with the inner one",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the start of the intro scene"); } },
					{ type: "command", content: function() { rubyai_game.runScene("part2"); } },
					{ type: "command", content: function() { rubyai_game.narrate("This is the end of the intro scene"); } },
				] );
				this.addScene( "part2", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the second scene"); } },
				] );
			},
			text_output: "This is the start of the intro scene\nThis is the second scene\nThis is the end of the intro scene\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">This is the start of the intro scene</div>",
				"<div class=\"narration\">This is the second scene</div>",
				"<div class=\"narration\">This is the end of the intro scene</div>",
				export_data.gui.game_over.neutral
			]
		},
		two_deep : {
			name: "Two scenes deep",
			description: "returns to all of the outer scenes, in order, after going two scenes deep",
			starting_scene: "intro",
			gui_settings: {
				max_rows : 6
			},
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the start of the intro scene"); } },
					{ type: "command", content: function() { rubyai_game.runScene("part2"); } },
					{ type: "command", content: function() { rubyai_game.narrate("This is the end of the intro scene"); } },
				] );
				this.addScene( "part2", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the start of the second scene"); } },
					{ type: "command", content: function() { rubyai_game.runScene("part3"); } },
					{ type: "command", content: function() { rubyai_game.narrate("This is the end of the second scene"); } },
				] );
				this.addScene( "part3", [
					{ type: "command", content: function() { rubyai_game.narrate("This is the third scene"); } },
				] );
			},
			text_output: "This is the start of the intro scene\n"+
				"This is the start of the second scene\n"+
				"This is the third scene\n"+
				"This is the end of the second scene\n"+
				"This is the end of the intro scene\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">This is the start of the intro scene</div>",
				"<div class=\"narration\">This is the start of the second scene</div>",
				"<div class=\"narration\">This is the third scene</div>",
				"<div class=\"narration\">This is the end of the second scene</div>",
				"<div class=\"narration\">This is the end of the intro scene</div>",
				export_data.gui.game_over.neutral
			]
		}
	},
	limited_output_scenes : {
		simple_lines : {
			name: "Limited Output",
			description: "Restrict the total output visible at any given time",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Third line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Fourth line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Fifth line"); } },
				] );
			},
			text_output: "First line\nSecond line\nThird line\nFourth line\nFifth line,Game Over!\n",
			gui_output: [
				"<div class=\"narration\">Third line</div>",
				"<div class=\"narration\">Fourth line</div>",
				"<div class=\"narration\">Fifth line</div>",
				export_data.gui.game_over.neutral
			]
		}
	},
	manual_input_scenes : {
		/*
		advanceGame : {
			name: "Advance the Game",
			description: "RubyAiGame.advanceGame() actually advances the progress of the script",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					function() { rubyai_game.narrate("First line"); },
					function() { rubyai_game.narrate("Second line"); },
					function() { rubyai_game.narrate("Third line"); },
					function() { rubyai_game.narrate("Fourth line"); },
					function() { rubyai_game.narrate("Fifth line"); },
				] );
			},
			text_output: "First line\nSecond line\nThird line\nFourth line\nFifth line,Game Over!\n",
			gui_output: [
				"<div class=\"narration\">Third line</div>",
				"<div class=\"narration\">Fourth line</div>",
				"<div class=\"narration\">Fifth line</div>",
				export_data.gui.game_over.neutral
			]
		},
		*/
		advanceGame_once : {
			name: "Advance the Game Once",
			description: "RubyAiGame.advanceGame() actually advances the progress of the script",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } }
				] );
			},
			manual_input : function() {
				rubyai_game.advanceGame();
			},
			text_output: "First line\n",
			gui_output: [
				"<div class=\"narration\">First line</div>"
			]
		},
		advanceGame_twice : {
			name: "Advance the Game Twice",
			description: "RubyAiGame.advanceGame() actually advances the progress of the script",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Third line"); } }
				] );
			},
			manual_input : function() {
				rubyai_game.advanceGame();
				rubyai_game.advanceGame();
			},
			text_output: "First line\nSecond line",
			gui_output: [
				"<div class=\"narration\">First line</div>",
				"<div class=\"narration\">Second line</div>"
			]
		},
		advanceGame_to_completion : {
			name: "Advance the Game to Completion",
			description: "Using RubyAiGame.advanceGame() up to the last step of the script automatically advances it to a \"Game Over\".",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } }
				] );
			},
			manual_input : function() {
				rubyai_game.advanceGame();
				rubyai_game.advanceGame();
			},
			text_output: "First line\nSecond line\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">First line</div>",
				"<div class=\"narration\">Second line</div>",
				export_data.gui.game_over.neutral
			]
		},
		choice_choose_first : {
			name: "Choose the first option",
			description: "Choose the first option out of a choice via the GUI callback.",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "choice", content: function() {
						rubyai_game.choice( [
							new Option("First Option", [
								{ type: "command", content: function() { rubyai_game.narrate("Chose the first option."); } }
							]),
							new Option("Second Option", [
								{ type: "command", content: function() { rubyai_game.narrate("Chose the second option."); } }
							]),
							new Option("Third Option", [
								{ type: "command", content: function() { rubyai_game.narrate("Chose the third option."); } }
							])
						] );
					} }
				] );
			},
			manual_input : function() {
				rubyai_game.advanceGame();
				var $option_link = getOptionLink(0);
				$option_link.click();
			},
			text_output: "Choose:\n(1) First Option\n(1) Second Option\nChose: (1) First Option\nChose the first option\nGame Over!",
			gui_output: [
				"<div class=\"chosen-option\"><span class=\"index\">(1)</span> First Option</div>",
				"<div class=\"narration\">Chose the first option.</div>",
				export_data.gui.game_over.neutral
			]
		},
		choice_choose_second : {
			name: "Choose the second option",
			description: "Choose the seoncd option out of a choice via the GUI callback.",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "choice", content: function() {
						rubyai_game.choice( [
							new Option("First Option", [
								{ type: "command", content: function() { rubyai_game.narrate("Chose the first option."); } }
							]),
							new Option("Second Option", [
								{ type: "command", content: function() { rubyai_game.narrate("Chose the second option."); } }
							]),
							new Option("Third Option", [
								{ type: "command", content: function() { rubyai_game.narrate("Chose the third option."); } }
							])
						] );
					} }
				] );
			},
			manual_input : function() {
				rubyai_game.advanceGame();
				var $option_link = getOptionLink(1);
				$option_link.click();
			},
			text_output: "Choose:\n(1) First Option\n(1) Second Option\nChose: (1) Second Option\nChose the second option\nGame Over!",
			gui_output: [
				"<div class=\"chosen-option\"><span class=\"index\">(2)</span> Second Option</div>",
				"<div class=\"narration\">Chose the second option.</div>",
				export_data.gui.game_over.neutral
			]
		}
	},
	follow_up_steps : {
		follow_up_once : {
			name: "Execute One Follow-Up Step",
			description: "Automatically execute any \"follow-up\" steps that come immediately after each step",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{
						type : "follow-up",
						content : function() {
							rubyai_game.narrate("Follow-up line");
						}
					},
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } }
				] );
			},
			text_output: "First line\nFollow-Up line\nSecond line\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">First line</div>",
				"<div class=\"narration\">Follow-up line</div>",
				"<div class=\"narration\">Second line</div>",
				export_data.gui.game_over.neutral
			]
		},
		follow_up_twice : {
			name: "Execute Two Follow-Up Steps",
			description: "Automatically execute any \"follow-up\" steps that come immediately after each step",
			starting_scene: "intro",
			gui_settings: {
				max_rows : 5
			},
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{
						type : "follow-up",
						content : function() {
							rubyai_game.narrate("First follow-up line");
						}
					},
					{
						type : "follow-up",
						content : function() {
							rubyai_game.narrate("Second follow-up line");
						}
					},
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } }
				] );
			},
			text_output: "First line\nFirst follow-Up line\nSecond follow-up line\nSecond line\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">First line</div>",
				"<div class=\"narration\">First follow-up line</div>",
				"<div class=\"narration\">Second follow-up line</div>",
				"<div class=\"narration\">Second line</div>",
				export_data.gui.game_over.neutral
			]
		},
		follow_up_two_sets : {
			name: "Execute Two Sets of Follow-Up Steps",
			description: "Automatically execute any \"follow-up\" steps that come immediately after each step",
			starting_scene: "intro",
			gui_settings: {
				max_rows : 5
			},
			contents: function() {
				this.addScene( "intro", [
					{ type: "command", content: function() { rubyai_game.narrate("First line"); } },
					{
						type : "follow-up",
						content : function() {
							rubyai_game.narrate("First follow-up line");
						}
					},
					{ type: "command", content: function() { rubyai_game.narrate("Second line"); } },
					{
						type : "follow-up",
						content : function() {
							rubyai_game.narrate("Second follow-up line");
						}
					}
				] );
			},
			text_output: "First line\nFirst follow-Up line\nSecond line\nSecond follow-up line\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">First line</div>",
				"<div class=\"narration\">First follow-up line</div>",
				"<div class=\"narration\">Second line</div>",
				"<div class=\"narration\">Second follow-up line</div>",
				export_data.gui.game_over.neutral
			]
		}
	},
	variables : {
		use_a_variable : {
			name: "Set and get in-game variable",
			description: "Set and then get the value of a variable used within just the game context",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "follow-up",
						content : function() {
							rubyai_game.setVar("location", "Puerto Rico");
						}
					},
					{ type: "command", content: function() { rubyai_game.narrate("The team arrives in %%[variable: location]%%."); } },
				] );
			},
			text_output: "The team arrives in Puerto Rico.\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">The team arrives in Puerto Rico.</div>",
				export_data.gui.game_over.neutral
			]
		},
		interpolation_narrate : {
			name: "Variable interpolation in narrate()",
			description: "Set a variable and then embed its value in a narrate() command's output dynamically",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "follow-up",
						content : function() {
							rubyai_game.setVar("location", "Puerto Rico");
						}
					},
					{ type: "command", content: function() { rubyai_game.narrate("The team elects to recuperate in %%[variable: location]%%."); } },
				] );
			},
			text_output: "The team elects to recuperate in Puerto Rico.\nGame Over!\n",
			gui_output: [
				"<div class=\"narration\">The team elects to recuperate in Puerto Rico.</div>",
				export_data.gui.game_over.neutral
			]
		},
		interpolation_speak : {
			name: "Variable interpolation in speak()",
			description: "Set a variable and then embed its value in a speak() command's output dynamically",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "follow-up",
						content : function() {
							rubyai_game.setVar("flavor", "Mint Chip Cookie Dough");
						}
					},
					{ type: "command", content: function() { rubyai_game.speak("Lucy", "I could eat %%[variable: flavor]%% ice cream forever."); } },
				] );
			},
			text_output: "Lucy: I could eat Mint Chip Cookie Dough ice cream forever.\nGame Over!\n",
			gui_output: [
				"<div class=\"speech\"><span class=\"character\">Lucy:</span><span class=\"statement\">I could eat Mint Chip Cookie Dough ice cream forever.</span></div>",
				export_data.gui.game_over.neutral
			]
		},
		interpolation_action : {
			name: "Variable interpolation in action()",
			description: "Set a variable and then embed its value in an action() command's output dynamically",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "follow-up",
						content : function() {
							rubyai_game.setVar("flavor", "Mint Chip Cookie Dough");
						}
					},
					{ type: "command", content: function() { rubyai_game.action("Lucy", "tried to eat %%[variable: flavor]%% ice cream forever."); } },
				] );
			},
			text_output: "Lucy tried to eat Mint Chip Cookie Dough ice cream forever.\nGame Over!\n",
			gui_output: [
				"<div class=\"action\"><span class=\"character\">Lucy</span> <span class=\"behavior\">tried to eat Mint Chip Cookie Dough ice cream forever.</span></div>",
				export_data.gui.game_over.neutral
			]
		},
		interpolation_codeBlock : {
			name: "Variable interpolation in codeBlock()",
			description: "Set a variable and then embed its value in a codeBlock() command's output dynamically",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "follow-up",
						content : function() {
							rubyai_game.setVar("flavor", "Mint Chip Cookie Dough");
						}
					},
					{ type: "command", content: function() { rubyai_game.codeBlock("set_var ice_cream_flavor => \"%%[variable: flavor]%%\""); } },
				] );
			},
			text_output: "CODE>>>\nset_var ice_cream_flavor => \"Mint Chip Cookie Dough\"\n<<<CODE\nGame Over!\n",
			gui_output: [
				"<pre class=\"code-block\">set_var ice_cream_flavor =&gt; \"Mint Chip Cookie Dough\"</pre>",
				export_data.gui.game_over.neutral
			]
		},
	},
	stage_states : {
		initial_stage : {
			name: "Set the initial state of the stage",
			description: "Start off by building the stage and adding a background image",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "command",
						content : function () {
							rubyai_game.showStage("park", "Public Park", "images/stages/park_default.png", "A heavily-forested park near downtown.");
						}
					},
					{
						type : "command",
						content : function () {
							rubyai_game.narrate("Show the background.");
						}
					},
				] );
			},
			stage_states: [
				{
					selector : ".background",
					attributes : {
						"class" : "background",
						"src" : "images/stages/park_default.png",
						"alt" : "Public Park: A heavily-forested park near downtown."
					}
				},
				{
					selector : ".character",
					attributes : {
						"class" : "character",
						"src" : undefined,
						"alt" : ""
					}
				}
			],
			gui_output: [
				("<div class=\"stage-summary\">" +
					"<div class=\"title\">Public Park</div>" +
					"<div class=\"description\">A heavily-forested park near downtown.</div>" +
					"</div>"
				),
				"<div class=\"narration\">Show the background.</div>",
				export_data.gui.game_over.neutral
			]
		},
	},
	show_characters : {
		show_one : {
			name: "Show a character on the stage",
			description: "Add the first \"character\" image to the stage and set its image",
			starting_scene: "intro",
			contents: function() {
				this.addScene( "intro", [
					{
						type : "command",
						content : function () {
							rubyai_game.showCharacter("marcus", "Prince Marcus", "images/characters/marcus_default.png", "The royal heir");
						}
					},
					{
						type : "command",
						content : function () {
							rubyai_game.narrate("Show the character.");
						}
					},
				] );
			},
			stage_states: [
				{
					selector : ".character",
					attributes : {
						"class" : "character",
						"src" : "images/characters/marcus_default.png",
						"alt" : "Prince Marcus: The royal heir"
					}
				},
				{
					selector : ".background",
					attributes : {
						"class" : "background",
						"src" : undefined,
						"alt" : ""
					}
				}
			],
			gui_output: [
				("<div class=\"character-summary\">" +
					"<div class=\"name\">Prince Marcus</div>" +
					"<div class=\"description\">The royal heir</div>" +
					"</div>"
				),
				"<div class=\"narration\">Show the character.</div>",
				export_data.gui.game_over.neutral
			]
		},
	}
};
