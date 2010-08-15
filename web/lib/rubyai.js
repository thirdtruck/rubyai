var debug_scenes;

var RubyAiGame = function(contents) {
	this.contents = contents;
	this.scenes = { };
	this.output = "";
	this.current_crawler = null;
	
	this.start = function(new_args) {
		new_args = new_args || {};
		var starting_scene_name = new_args['scene'];
		var starting_scene = this.scenes[ starting_scene_name ];
		
		if(starting_scene !== undefined) {
			this.current_crawler = new SceneCrawler(this, starting_scene);
			while(this.current_crawler.advanceScene()) { /* move this into a method on the crawler? */ }
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
	
	this.addScene = function(name, scene_contents) {
		this.scenes[name] = scene_contents;
	};
	
	this.runScene = function( scene_name ) {
		var next_scene = this.scenes[scene_name];
		this.current_crawler = new SceneCrawler(this, next_scene);
		while(this.current_crawler.advanceScene()) { /* move this into a method on the crawler? */ }
	};
	
	this.choice = function( options ) {
		this.output += "Choose:\n";
		
		for(var option_index = 0; option_index < options.length; option_index++) {
			var option = options[option_index];
			var printed_index = option_index + 1;
			this.output += "("+(printed_index)+") "+option.name+"\n";
		}
	}
			
	
	this.outputAsText = function() {
		return this.output;
	};
	
	this.contents();
	
	return this;
};

var SceneCrawler = function(game, steps) {
	this.game = game;
	this.parent_crawler = this.game.current_crawler;
	
	this.steps = steps;
	this.step_index = 0;
	
	this.advanceScene = function() {
		var next_step = this.steps[this.step_index];
		
		if(next_step !== undefined) {
			next_step.call();
			this.step_index += 1;
			return true;
		} else {
			this.game.current_crawler = this.parent_crawler;
			return false;
		}
	};
	
	return this;
}

var Option = function(name, contents) {
	this.name = name;
	this.contents = contents;
	return this;
};
