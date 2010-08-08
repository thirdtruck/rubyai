/*
var StageElement = function(args) {
	this.defaults = {
		alias: "<Alias>",
		name: "<Name>",
		description: "",
	};
	this.initialize(args);
	return this;
}
StageElement.prototype.initialize = function(args) {
	complete_args = $.extend(this.defaults, args);
	
	this.alias = complete_args.alias;
	this.name = complete_args.name;
	this.description = complete_args.description;
	
	return this;
};

// Inheritance
var Stage = function(args) {
	this.defaults = $.extend(this.defaults, { description: "<A Stage>" });
	this.initialize(args);
	return this;
}
Stage.prototype = new StageElement();


var st = new Stage();
*/

var settings = {
	max_elements: 5
};

var scenes = {};
var pending = [];
var steps = [];

function add_step(step) {
	steps.push(step);
}

function print(element) {
	var new_element = $("<p/>").append(element);
	pending.push(new_element);
}

function print_multiple(elements) {
	var final_element = $("<p/>");
	for(var next_element; next_element = elements.shift(); ) {
		final_element.append("<p/>").append(next_element);
	}
	pending.push(final_element);
}

function advance_story() {
	next_step = steps.shift();
	if ( ! next_step ) {
		return;
	} else {
		next_step();
	}
	
	next_element = pending.shift();
	if ( ! next_element ) { return }
	
	game.output_element.append(next_element);
	while( game.output_element.children("p").length > settings.max_elements ) {
		game.output_element.children("p:first").remove();
	}
}

function clear_all() {
	game.output_element.empty();
}

function intro() {
	add_step( function() {
	print("Welcome to Ruby'Ai!");
	} );
};

function add_scene(name, contents) {
	scenes[name] = contents;
};

function run_scene(name, contents) {
	scene_contents = scenes[name];
	add_step( function() {
		scene_contents();
		clear_all();
		advance_story();
	} );
	advance_story();
};

function show(name, doing) {
	add_step( function() {
		var output = "[Show " + name;
		output += doing ? " " + doing : "";
		output += "]";
		print(output);
	} );
};

function show_stage(stage_alias, stage_name, image_url, description) {
	add_step( function() {
		$("#display").css("background-image", "url("+image_url+")");
	} );
}

function show_character(character_alias, character_name, image_url, description) {
	add_step( function() {
		$("#character").attr("src", image_url).show();
	} );
}

function hide(name) {
	add_step( function() {
		print("[Hide " + name + "]");
	} );
};

function sound(name) {
	add_step( function() {
		print("[Play sound *" + name + "*]");
	} );
};

function speak(character, statement, image_url) {
	add_step( function() {
		if(image_url) { $("#character").attr("src", image_url).show(); }
		print(character + ": " + statement);
	} );
};

function action(character, does_thing, image_url) {
	add_step( function() {
		if(image_url) { $("#character").attr("src", image_url).show(); }
		print(character + " " + does_thing);
	} );
};

function narrate(statement) {
	add_step( function() {
		print(statement);
	} );
};

function code_block(statement) {
	add_step( function() {
		print('<pre class="code">'+statement+'</pre>');
	} );
}

function game_over(type) {
	add_step( function() {
		elements = [$("<p>Game Over!</p>")];
		if (type == "success") {
			elements.push($("<p>You win!</p>"));
		} else if (type == "failure") {
			elements.push($("<p>You lose!</p>"));
		} else {
			elements.push($("<p>Please play again soon!</p>"));
		}
		print_multiple(elements);
		$("#controls").hide();
	} );
}

function choose_from(choice) {
	var all_options = [];
	for(option_index = 0; option_index < choice.options.length; option_index++) {
		var option = choice.options[option_index];
		button = $("<a href=\"javascript:void(0);\">"+option.description+"</a>");
		/* Remember, Javascript only has function-level closure and no block-level closure */
		button.click(
			(function(option) {
				return function() {
					option.script();
					$("#controls").show(); 
				}
			})(option)
		);
		all_options.push(button);
	}
	
	add_step( function() {
		$("#controls").hide();
		
		print_multiple(all_options);
	} );
};

function RubyAiGame(output_element, script) {
	this.output_element = output_element;
	this.script = script;
	
	this.start = function() {
		this.script.run();
	};
	
	return this;
};

function RubyAiScript(script_contents) {
	this.contents = script_contents;
	
	this.run = function() {
		print("Script started!");
		this.contents();
	};
	
	return this;
};

function Choice(options) {
	this.options = options;
	
	return this;
};

function Option(description, script) {
	this.description = description;
	this.script = script;
	
	return this;
}

$(document).keypress( function(pressed_key) {
	if(pressed_key.charCode == 32) {
		advance_story();
	}
} );
