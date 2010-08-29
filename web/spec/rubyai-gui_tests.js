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
	
	function testGUIElementAttributes(label, $element, attributes) {
		for(var key in attributes) { // TODO: Replace this with a proper iterator
			var value= attributes[key];
			
			same(
				$element.attr(key),
				attributes[key],
				"Attribute \"" + key + "\" matches on the \"" + label + "\" element"
			);
		}
	}
	
	function testScript( example_data, label, scene_name, contents, expected_gui_output, gui_settings, expected_stage_states ) {
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
			
			if (typeof expected_gui_output === "string") {
				same(	
					expected_gui_output,
					tracked_elements.$top.find(".output").html(),
					"Received the expected GUI output"
				);
			} else if (expected_gui_output !== undefined) {
				// TODO: Update the tests to account for the stage layout and make this stage-excluding limitation on the output check more explicit
				// Consider renaming this function to testScriptFinalOutput() and then adding one that checks the game-state on a per-step basis,
				// i.e. confirming a specific (sometimes changing) background on each advancement
				var $total_gui_output = tracked_elements.$top.find(".output").children();
				
				same(
					expected_gui_output.length,
					$total_gui_output.length,
					"The total output of the GUI element has the same element count as the expected output"
				);
				
				for(var output_index = 0; output_index < expected_gui_output.length; output_index += 1) {
					// TODO: Find a more efficient way of comparing total HTML output
					var $gui_output = $('<div/>').append( $total_gui_output.eq(output_index).clone() ).html();
					
					same(	
						$gui_output,
						expected_gui_output[output_index],
						"Received the expected GUI output for line "+output_index
					);
				}
				
			}
			
			// Stage states check
			if (typeof expected_stage_stages === "string") {
				same(	
					expected_stage_states,
					tracked_elements.$top.find(".stage").html(),
					"Stage was in the expected state"
				);
			} else if (expected_stage_states !== undefined) {
				var $total_stage_state = tracked_elements.$top.find(".stage").children();
				
				same(
					expected_stage_states.length,
					$total_stage_state.length,
					"The total output of the stage element has the same element count as the expected output"
				);
				
				for(var i = 0; i < expected_stage_states.length; i += 1) {
					var selector = expected_stage_states[i].selector;
					var $checked_element = tracked_elements.$top.find(selector);
					testGUIElementAttributes(selector, $checked_element, expected_stage_states[i].attributes);
				}
				
				/*
				for(var output_index = 0; output_index < expected_stage_states.length; output_index += 1) {
					// TODO: Find a more efficient way of comparing total HTML output
					var $stage_state = $('<div/>').append( $total_stage_state.eq(output_index).clone() ).html();
					
					same(	
						$stage_state,
						expected_stage_states[output_index],
						"Received the expected stage state for line "+output_index
					);
				}
				*/
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
					example.gui_settings,
					example.stage_states
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
	
	module("Follow-Up Steps", {
		setup: basicSetup,
		teardown: basicTeardown
	} );
	
	testScenes(test_data.follow_up_steps);
	
	module("Variables", {
		setup: basicSetup,
		teardown: basicTeardown
	} );
	
	testScenes(test_data.variables);
	
	module("GUI - Stage States", {
		setup: basicSetup,
		teardown: basicTeardown
	} );
	
	testScenes(test_data.stage_states);
});
