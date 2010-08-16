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
		this.running = true;
		
		if(starting_scene !== undefined) {
			this.current_crawler = new SceneCrawler();
			this.current_crawler.crawlScene(starting_scene);
			if(this.running) {
				this.gameOver();
			}
		} else {
			throw { message: "Missing scene: " + starting_scene_name };
		}
		
		return true;
	};
	
	this.narrate = function( statement ) {
		this.output += statement + "\n";
	};
	
	this.speak = function( character, statement ) {
		this.output += character + ": " + statement + "\n";
	};
	
	this.action = function( character, behavior ) {
		this.output += character + " " + behavior + "\n";
	};
	
	this.sound = function( sound_name, sound_description ) {
		this.output += "*"+sound_description+"*" + "\n";
	};
	
	this.showStage = function(alias, title, description) {
		this.output += "Show stage " + title + " [" + alias + "]: " + description + "\n";
	};
	
	this.showCharacter = function(alias, name, image) {
		this.output += "Show character " + name + " [" + alias + "]: " + image + "\n";
	};
	
	this.hide = function(alias, name) {
		this.output += "[Hide " + name + "]" + "\n";
	};
	
	this.codeBlock = function(code) {
		this.output += "CODE>>>\n"+code+"\n<<<CODE\n";
	};
	
	this.addScene = function(name, scene_contents) {
		this.scenes[name] = scene_contents;
	};
	
	this.runScene = function( scene_name ) {
		var next_scene = this.scenes[scene_name];
		this.current_crawler.crawlScene(next_scene);
	};
	
	this.choice = function( options ) {
		this.output += "Choose:\n";
		
		for(var option_index = 0; option_index < options.length; option_index++) {
			var option = options[option_index];
			var printed_index = option_index + 1;
			this.output += "("+(printed_index)+") "+option.name+"\n";
		}
		var predefined_choice = this.predefined_choices.shift();
		if(predefined_choice !== undefined) {
			predefined_choice -= 1;
			this.current_crawler.crawlScene(options[predefined_choice].contents);
		}
	}
			
	this.gameOver = function( final_status ) {
		if(final_status == "success") {
			this.output += "Game Over: You Win!\n";
		} else if(final_status == "failure") {
			this.output += "Game Over: You Lose!\n";
		} else {
			this.output += "Game Over!\n";
		}
		this.current_crawler.reportGameOver( final_status );
		this.running = false;
	};
	
	this.outputAsText = function() {
		return this.output;
	};
	
	this.contents();
	
	return this;
};

var SceneCrawler = function(steps) {
	this.steps = steps;
	this.step_index = 0;
	this.running = true;
	this.child_crawler = null;
	
	this.reportGameOver = function(game_over_status) {
		this.running = false;
		
		if(this.child_crawler) {
			this.child_crawler.reportGameOver(game_over_status);
		}
	}
	
	this.advanceScene = function() {
		var next_step = this.steps[this.step_index];
		
		if(this.running && next_step !== undefined) {
			next_step.call();
			this.step_index += 1;
			return true;
		} else {
			return false;
		}
	};
	
	this.crawlScene = function(scene_contents) {
		var target_crawler;
		if(scene_contents) {
			target_crawler = new SceneCrawler(scene_contents);
			this.child_crawler = target_crawler;
		} else {
			target_crawler = this;
		}
		while(target_crawler.advanceScene()) {
		}
	};
	
	return this;
};

var Option = function(name, contents) {
	this.name = name;
	this.contents = contents;
	
	return this;
};
