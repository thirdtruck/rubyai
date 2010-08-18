var export_data = {
	gui : {
		game_over : {
			success : "<div class=\"game-over success\">Game Over!  You Win!</div>",
			failure : "<div class=\"game-over failure\">Game Over!  You Lose!</div>",
			neutral : "<div class=\"game-over neutral\">Game Over!</div>"
		}
	},
	
};

var test_data  = {
	example_scenes : {
		empty: [],
		one_step: [function() { }],
		one_command: [function() { rubyai_game.narrate("Stuff happens"); }],
		two_commands: [
			function() { rubyai_game.narrate("Stuff happens"); },
			function() { rubyai_game.narrate("More stuff happens"); }
		]
	},
	command_examples : {
		narrate: { contents: [function() { rubyai_game.narrate("Stuff happens"); }],
			text_output: "Stuff happens\nGame Over!\n",
			gui_output: ["<div class=\"narration\">Stuff happens</div>", export_data.gui.game_over.neutral]
		},
		speak: { contents: [function() { rubyai_game.speak("Lucy", "I have something to say.") }],
			text_output: "Lucy: I have something to say.\nGame Over!\n",
			gui_output: ["<div class=\"speech\"><span class=\"character\">Lucy:</span><span class=\"statement\">I have something to say.</span></div>", export_data.gui.game_over.neutral]
		},
		action: { contents: [function() { rubyai_game.action("Lucy", "does something.") }],
			text_output: "Lucy does something.\nGame Over!\n",
			gui_output: ["<div class=\"action\"><span class=\"character\">Lucy</span> <span class=\"behavior\">does something.</span></div>", export_data.gui.game_over.neutral]
		},
		sound: { contents: [function() { rubyai_game.sound("bang", "Bang") }],
			text_output: "*Bang*\nGame Over!\n",
			gui_output: ["<div class=\"sound\">Bang</div>", export_data.gui.game_over.neutral]
		},
		showStage: { contents: [function() { rubyai_game.showStage("outdoors", "Outdoors", "The outdoors, where they keep all of the trees.") }],
			text_output: "Show stage Outdoors [outdoors]: The outdoors, where they keep all of the trees.\nGame Over!\n",
			gui_output: ["<div class=\"stage-title\">Outdoors</div><div class=\"stage-description\">The outdoors, where they keep all of the trees.</div>", export_data.gui.game_over.neutral]
		},
		showCharacter: { contents: [function() { rubyai_game.showCharacter("lucy", "Lucy", "lucy_default.png") }],
			text_output: "Show character Lucy [lucy]: lucy_default.png\nGame Over!\n",
			gui_output: ["<div class=\"character-name\">Lucy</div><div class=\"character-image\">lucy_default.png</div>", export_data.gui.game_over.neutral]
		},
		hide: { contents: [function() { rubyai_game.hide("lucy", "Lucy") }],
			text_output: "[Hide Lucy]\nGame Over!\n",
			gui_output: ["<div class=\"event\">[Hide Lucy]</div>", export_data.gui.game_over.neutral]
		},
		codeBlock: { contents: [function() { rubyai_game.codeBlock("\tline_one();\n\tline_two();") }],
			text_output: "CODE>>>\n\tline_one();\n\tline_two();\n<<<CODE\nGame Over!\n",
			gui_output: ["<pre class=\"code-block\">\tline_one();\n\tline_two();</pre>", export_data.gui.game_over.neutral]
		},
		gameOver_neutral: { contents: [function() { rubyai_game.gameOver() }],
			text_output: "Game Over!\n",
			gui_output: [export_data.gui.game_over.neutral]
		},
		gameOver_success: { contents: [function() { rubyai_game.gameOver("success") }],
			text_output: "Game Over: You Win!\n",
			gui_output: [export_data.gui.game_over.success]
		},
		gameOver_failure: { contents: [function() { rubyai_game.gameOver("failure") }],
			text_output: "Game Over: You Lose!\n",
			gui_output: [export_data.gui.game_over.failure]
		},
		single_option: { contents: [function() {
				rubyai_game.choice( [
					new Option("First Option", function() {
						rubyai_game.narrate("Chose the first option.");
					})
				] );
			}],
			text_output: "Choose:\n(1) First Option\nChose the first option.\nGame Over!\n",
			gui_output: ["<div class=\"choice\">Choose:<div class=\"option\"><span class=\"index\">(1)</span> First Option</div></div>", export_data.gui.game_over.neutral]
		}
	}
};
