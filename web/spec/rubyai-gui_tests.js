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
	
	function testScript( example_data, label, scene_name, contents, expected_output, gui_settings ) {
		test(label, function() {
			example_data = example_data || {};
			
			tracked_elements.$top = $("#rubyai-game");
			rubyai_gui = new RubyAiGUI( tracked_elements.$top, gui_settings );
			rubyai_game = new RubyAiGame( contents );
			
			rubyai_game.start({ scene: scene_name, gui: rubyai_gui });
			if(example_data.manual_input) {
				example_data.manual_input.call();
			} else {
				rubyai_game.runAll();
			}
			
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
				
				// TODO: make these named parameters
				testScript(
					example,
					"test scenes/" + set_name,
					"intro",
					example.contents,
					example.gui_output,
					example.gui_settings
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
				null,
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

	module("Full Scenes - GUI Output", {
		setup: basicSetup,
		teardown: basicTeardown
	} );

	testScenes(test_data.runScene_examples);

	module("Limited Output - GUI Output", {
		setup: basicSetup,
		teardown: basicTeardown
	} );

	testScenes(test_data.limited_output_scenes);
	
	module("GUI - Manual Input", {
		setup: basicSetup,
		teardown: basicTeardown
	} );
	
	testScenes(test_data.manual_input_scenes);
	
	module("GUI - Follow-Up Steps", {
		setup: basicSetup,
		teardown: basicTeardown
	} );
	
	testScenes(test_data.follow_up_steps);
});
