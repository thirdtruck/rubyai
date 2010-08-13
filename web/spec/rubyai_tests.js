var rubyai_game;

module("Basic Setup");

test("core objects", function() {
	expect(3); 
	
	var rubyai_game = new RubyAiGame();
	var rubyai_script = new RubyAiScript( rubyai_game, function() { } );
	
	ok(rubyai_game, "The game engine initializes without issue.");
	ok(rubyai_script, "The script object initializes without issue.");
	ok(new Option(), "The Option object initializes without issue.");
} );

var basicSetup = function() {
	rubyai_game = new RubyAiGame();
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
		output: "Stuff happens"
	},
	speak: { contents: [function() { rubyai_game.speak("Lucy", "I have something to say.") }],
		output: "Lucy: I have something to say."
	},
	action: { contents: [function() { rubyai_game.action("Lucy", "does something.") }],
		output: "Lucy does something."
	}
};

function testContent( examples ) {
	for(var scene_name in examples) {
		// Remember, function-only context
		(function(scene_name) {
			test("add content/"+scene_name, function() {
				expect(1);
				
				var script = new RubyAiScript( rubyai_game, function() {
					this.addScene( scene_name, examples[scene_name] );
				} );
				
				same(	rubyai_game.scenes[scene_name],
					examples[scene_name],
					"RubyAiScript.addScene() adds the '"+scene_name+"' scene to the game correctly."
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
			
			var script = new RubyAiScript( rubyai_game, function() {
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
