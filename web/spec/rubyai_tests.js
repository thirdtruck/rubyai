var rubyai_game;

module("Basic Setup");

test("core objects", function() {
	expect(2); 
	
	rubyai_game = new RubyAiGame(function() {} );
	
	ok(rubyai_game, "The game engine initializes without issue.");
	ok(new Option(), "The Option object initializes without issue.");
} );

var basicSetup = function() {
	rubyai_game = new RubyAiGame(function() {} );
};

var basicTeardown = function() {
	rubyai_game = null;
};

var example_scenes = {
	empty: [],
	one_step: [function() { }],
	one_command: [function() { rubyai_game.narrate("Stuff happens"); }],
	two_commands: [
		function() { rubyai_game.narrate("Stuff happens"); },
		function() { rubyai_game.narrate("More stuff happens"); }
	]
};

var command_examples = {
	narrate: { contents: [function() { rubyai_game.narrate("Stuff happens"); }],
		output: "Stuff happens\n"
	},
	speak: { contents: [function() { rubyai_game.speak("Lucy", "I have something to say.") }],
		output: "Lucy: I have something to say.\n"
	},
	action: { contents: [function() { rubyai_game.action("Lucy", "does something.") }],
		output: "Lucy does something.\n"
	},
	sound: { contents: [function() { rubyai_game.sound("bang", "Bang") }],
		output: "*Bang*\n"
	},
};

function testContent( examples ) {
	for(var scene_name in examples) {
		// Remember, function-only context
		(function(scene_name) {
			test("add content/"+scene_name, function() {
				expect(1);
				
				rubyai_game = new RubyAiGame( function() {
					this.addScene( scene_name, examples[scene_name] );
				} );
				
				same(	rubyai_game.scenes[scene_name],
					examples[scene_name],
					"RubyAiGame.addScene() adds the '"+scene_name+"' scene to the game correctly."
				);
			} );
		})(scene_name);
	};
}

module("Script Content", {
	setup: basicSetup,
	teardown: basicTeardown
} );

testContent(example_scenes);

function testCommands( examples ) {
	for(var scene_name in examples) {
		// Remember, function-only context
		(function(scene_name) {
		test("test command/"+scene_name, function() {
			expect(1);
			
			var contents = examples[scene_name].contents;
			var expected_output = examples[scene_name].output;
			
			rubyai_game = new RubyAiGame( function() {
				this.addScene( scene_name, contents );
			} );
			
			rubyai_game.start({ scene: scene_name })
			
			same(	rubyai_game.outputAsText(),
				expected_output,
				"Running the '"+scene_name+"' scene gives the expected output."
			);
		} );
		})(scene_name);
	};
}

module("Script Commands", {
	setup: basicSetup,
	teardown: basicTeardown
} );

testCommands(command_examples);

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
		output: "This is the intro scene\nThis is the second scene\n"
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
		output: "This is the start of the intro scene\nThis is the second scene\nThis is the end of the intro scene\n"
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
			"This is the end of the intro scene\n"
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
			"(1) First Choice\n"
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
			"Chose First Option\n"
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
			"Chose Second Option\n"
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
			"Chose First Option Again\n"
			
	},
];

testFullScript("choice", choice_examples);
