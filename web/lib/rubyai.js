var debug_scenes;

var RubyAiGame = function(contents) {
	this.variables = { };
	this.contents = contents;
	this.scenes = { };
	this.output = "";
	this.current_crawler = null;
	this.running = false;
	this.pending_choice = false;
	
	this.start = function(new_args) {
		new_args = new_args || {};
		var starting_scene_name = new_args.scene;
		var starting_scene = this.scenes[ starting_scene_name ];
		this.predefined_choices = new_args.predefined_choices || [];
		this.gui = new_args.gui;
		this.running = true;
		
		if(starting_scene !== undefined) {
			this.current_crawler = new SceneCrawler(starting_scene);
		} else {
			throw { message: "Missing scene: " + starting_scene_name };
		}
		
		return true;
	};
	
	this.narrate = function( statement ) {
		statement = this.interpolatedSubstitution(statement);
		if(this.gui !== undefined) {
			this.gui.narrate(statement);
		} else {
			this.output += statement + "\n";
		}
	};
	
	this.speak = function( character, statement, image_url ) {
		statement = this.interpolatedSubstitution(statement);
		if(this.gui !== undefined) {
			this.gui.speak(character, statement, image_url);
		} else {
			this.output += character + ": " + statement + "\n";
		}
	};
	
	this.action = function( character, behavior, image_url ) {
		behavior = this.interpolatedSubstitution(behavior);
		if(this.gui !== undefined) {
			this.gui.action(character, behavior, image_url);
		} else {
			this.output += character + " " + behavior + "\n";
		}
	};
	
	this.sound = function( sound_name, sound_description ) {
		if(this.gui !== undefined) {
			this.gui.sound(sound_name, sound_description);
		} else {
			this.output += "*"+sound_description+"*" + "\n";
		}
	};
	
	this.showStage = function(alias, title, image_url, description) {
		if(this.gui !== undefined) {
			this.gui.showStage(alias, title, image_url, description);
		} else {
			this.output += "Show stage " + title + " [" + alias + "]: " + description + "\n";
		}
	};
	
	this.showCharacter = function(alias, name, image, description) {
		if(this.gui !== undefined) {
			this.gui.showCharacter(alias, name, image, description);
		} else {
			this.output += "Show character " + name + " [" + alias + "]: " + image + "\n";
		}
	};
	
	this.hide = function(alias, name) {
		if(this.gui !== undefined) {
			this.gui.hide(alias, name);
		} else {
			this.output += "[Hide " + name + "]" + "\n";
		}
	};
	
	this.codeBlock = function(code) {
		code = this.interpolatedSubstitution(code);
		if(this.gui !== undefined) {
			this.gui.codeBlock(code, name);
		} else {
			this.output += "CODE>>>\n"+code+"\n<<<CODE\n";
		}
	};
	
	this.addScene = function(name, scene_contents) {
		this.scenes[name] = scene_contents;
	};
	
	this.runScene = function( scene_name ) {
		var next_scene = this.scenes[scene_name];
		this.current_crawler.crawlScene(next_scene);
	};
	
	this.choice = function( options ) {
		var game = this;
		game.pending_choice = true;
		
		if(game.gui !== undefined) {
			game.gui.choice(
				function (option) {
					game.pending_choice = false;
					game.current_crawler.crawlScene(option.contents);
					game.advanceGame();
					// TODO: remove the need for this second advance
					game.advanceGame();
				},
				options
			);
		} else {
			game.output += "Choose:\n";
			
			for(var option_index = 0; option_index < options.length; option_index++) {
				var option = options[option_index];
				var printed_index = option_index + 1;
				game.output += "("+(printed_index)+") "+option.name+"\n";
			}
		}
		var predefined_choice = game.predefined_choices.shift();
		if(predefined_choice !== undefined) {
			predefined_choice -= 1;  // Account for the base-1 index of the display choices vs base-0 arrays
			game.pending_choice = false;
			game.current_crawler.crawlScene(options[predefined_choice].contents);
		}
	}
			
	this.gameOver = function( final_status ) {
		var final_output;
		if(final_status == "success") {
			final_output = "Game Over: You Win!";
		} else if(final_status == "failure") {
			final_output = "Game Over: You Lose!";
		} else {
			final_output = "Game Over!";
		}
		if(this.gui !== undefined) {
			this.gui.gameOver(final_status);
		} else {
			this.output += final_output + "\n";
		}
		this.current_crawler.reportGameOver( final_status );
		this.running = false;
	};
	
	this.outputAsText = function() {
		return this.output;
	};
	
	this.textOutput = function() {
		this.gui.showAllText(this.outputAsText());
	}
	
	this.advanceGame = function() {
		if( this.pending_choice ) {
			return;
		}
		
		this.current_crawler.advanceScene();
		if( (this.current_crawler.scriptFinished()) && (this.running) && ( ! this.pending_choice ) ) {
			// Finish with a "Game Over" automatically if we run out of script
			this.gameOver();
		}
	};
	
	this.runAll = function() {
		this.advanceGame();
		while( ! this.current_crawler.scriptFinished() ) {
			if( this.pending_choice && this.predefined_choices.length === 0 ) {
				return;
			}
			
			this.advanceGame();
		};
		this.advanceGame();
	};
	
	this.setVar = function(name, value) {
		this.variables[name] = value;
	};
	
	this.getVar = function(name) {
		return this.variables[name];
	};
	
	this.conditional = function(conditional_args) {
		var game = this;
		
		var current_conditional = new Conditional(conditional_args);
		
		var content_to_run = current_conditional.getChosenContent();
		
		game.current_crawler.crawlScene(content_to_run);
		game.advanceGame();
	};
	
	// TODO: prepare unit tests for this functionality before including it.  It means setting a good example for yourself and others.
	this.interpolatedSubstitution = function(text) {
		var re_pattern = /%%\[(\w+: \w+)\]%%/;
		var matches = text.match(re_pattern, 'g');
		
		if(matches === null) {
			return text;
		}
		
		for(var i =  1; i < matches.length; i += 1) {
			var interpolation_parts = matches[i].split(': ');
			var interpolation_type = interpolation_parts[0];
			var subject = interpolation_parts[1];
			var value = this.variables[subject] === undefined ? "[undefined variable: " + subject + "]" : this.variables[subject];
			text = text.replace(re_pattern, value);
		} 
		
		return text;
	};
	
	// TODO: prepare unit tests for this functionality before including it.  It means setting a good example for yourself and others.
	/*
	this.gameFinished = function() {
		return this.current_crawler.scriptFinished();
	};
	*/
	
	// Run the provided script
	this.contents();
	
	return this;
};

var SceneCrawler = function(steps) {
	this.steps = steps || [];
	this.step_index = 0;
	this.running = true;
	this.child_crawler = undefined;
	
	this.reportGameOver = function(game_over_status) {
		this.running = false;
		
		if(this.child_crawler) {
			this.child_crawler.reportGameOver(game_over_status);
		}
	}
	
	this.scriptFinished = function() {
		if( ! this.running ) {
			return true;
		}
		
		var child_finished = true;
		if(this.child_crawler !== undefined) {
			child_finished = this.child_crawler.scriptFinished();
		}
		
		var out_of_steps = (this.steps[this.step_index] === undefined);
		
		return child_finished && out_of_steps;
	};
	
	this.advanceScene = function() {
		if(this.scriptFinished()) {
			return;
		}
		
		if(this.child_crawler !== undefined) {
			this.child_crawler.advanceScene();
			if(this.child_crawler.scriptFinished()) {
				this.child_crawler = undefined;
			}
			return;
		}
		
		var next_step = this.steps[this.step_index];
		if(next_step.content === undefined) {
			//console.log("Next Step: ", next_step);
		}
		
		// TODO: Replace these if's with a table of callbacks
		var content_to_run = undefined;
		if(next_step.type === "choice") {
			this.pending_choice = true;
			content_to_run = next_step.content;
		} else if(next_step.type === "command") {
			content_to_run = next_step.content;
		} else {
			// TODO: log these unaccounted-for types
			content_to_run = next_step.content;
			// Error-logging goes here.  Find a way to address "console" being undefined.
			/*
			content_to_run = function () {
				console.log("Unrecognized command type: " + next_step.type);
			};
			*/
		}
		content_to_run.call();
		
		
		var peek_ahead_step = this.steps[this.step_index+1];
		while(peek_ahead_step !== undefined && peek_ahead_step.type && peek_ahead_step.type === "follow-up") {
			peek_ahead_step.content.call();
			this.step_index += 1;
			peek_ahead_step = this.steps[this.step_index+1]
		}
		
		this.step_index += 1;
	};
	
	this.appendCrawler = function(descendant_crawler) {
		if(this.child_crawler === undefined) {
			this.child_crawler = descendant_crawler;
		} else {
			this.child_crawler.appendCrawler(descendant_crawler);
		}
	};
	
	this.crawlScene = function(scene_contents) {
		var target_crawler;
		if(scene_contents) {
			target_crawler = new SceneCrawler(scene_contents);
			this.appendCrawler(target_crawler);
		} else {
			target_crawler = this;
		}
	};
	
	return this;
};

var Option = function(name, contents) {
	this.name = name;
	this.contents = contents;
	
	return this;
};

var Conditional = function(args) {
	this.compare_to = args.compare_to;
	this.default_result = args.default_result || function () {
		/* null function */
	};
	this.conditions = args.conditions || {};
	
	this.getChosenContent = function () {
		var chosen_content = this.conditions[this.compare_to.call()];
		return (chosen_content !== undefined ? chosen_content : this.default_result);
	};
	
	return this;
};
