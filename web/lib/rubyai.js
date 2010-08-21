var debug_scenes;

var RubyAiGame = function(contents) {
	this.contents = contents;
	this.scenes = { };
	this.output = "";
	this.current_crawler = null;
	this.running = false;
	
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
		if(this.gui !== undefined) {
			this.gui.narrate(statement);
		} else {
			this.output += statement + "\n";
		}
	};
	
	this.speak = function( character, statement ) {
		if(this.gui !== undefined) {
			this.gui.speak(character, statement);
		} else {
			this.output += character + ": " + statement + "\n";
		}
	};
	
	this.action = function( character, behavior ) {
		if(this.gui !== undefined) {
			this.gui.action(character, behavior);
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
	
	this.showStage = function(alias, title, description) {
		if(this.gui !== undefined) {
			this.gui.showStage(alias, title, description);
		} else {
			this.output += "Show stage " + title + " [" + alias + "]: " + description + "\n";
		}
	};
	
	this.showCharacter = function(alias, name, image) {
		if(this.gui !== undefined) {
			this.gui.showCharacter(alias, name, image);
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
		if(this.gui !== undefined) {
			this.gui.choice(options);
		} else {
			this.output += "Choose:\n";
			
			for(var option_index = 0; option_index < options.length; option_index++) {
				var option = options[option_index];
				var printed_index = option_index + 1;
				this.output += "("+(printed_index)+") "+option.name+"\n";
			}
		}
		var predefined_choice = this.predefined_choices.shift();
		if(predefined_choice !== undefined) {
			predefined_choice -= 1;  // Account for the base-1 index of the display choices vs base-0 arrays
			this.current_crawler.crawlScene(options[predefined_choice].contents);
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
		var still_going = this.current_crawler.advanceScene();
		if( (! still_going) && (this.running) ) {
			// Finish with a "Game Over" automatically if we run out of script
			this.gameOver();
		}
		return still_going;
	};
	
	this.runAll = function() {
		while(this.advanceGame()) {
			var crawlers = [this.current_crawler];
			for(	var this_crawler = this.current_crawler.child_crawler;
				this_crawler !== undefined;
				this_crawler = this_crawler.child_crawler ) {
				crawlers.push(this_crawler);
			}
		};
		this.advanceGame();
	};
	
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
	
	this.advanceScene = function() {
		if( ! this.running ) {
			return false;
		}
		
		if(this.child_crawler !== undefined && this.child_crawler.advanceScene()) {
			return true;
		}
		
		var next_step = this.steps[this.step_index];
		
		if(next_step === undefined) {
			return false;
		}
		
		next_step.call();
		this.step_index += 1;
		return true;
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
