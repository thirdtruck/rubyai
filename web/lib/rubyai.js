var debug_scenes;

var RubyAiGame = function() {
	this.scenes = { };
	this.output = "";
	this.current_crawler = null;
	
	this.start = function(new_args) {
		new_args = new_args || {};
		var starting_scene_name = new_args['scene'];
		var starting_scene = this.scenes[ starting_scene_name ];
		
		if(starting_scene !== undefined) {
			this.current_crawler = new SceneCrawler(starting_scene);
			while(this.current_crawler.advanceScene()) { /* move this into a method on the crawler? */ }
		} else {
			throw { message: "Missing scene: " + starting_scene_name };
		}
		
		return true;
	};
	
	this.narrate = function( statement ) {
		this.output += statement;
	};
	
	this.speak = function( character, statement ) {
		this.output += character + ": " + statement;
	};
	
	this.action = function( character, behavior ) {
		this.output += character + " " + behavior;
	};
	
	this.outputAsText = function() {
		return this.output;
	};
	
	return this;
};

var SceneCrawler = function(steps) {
	this.steps = steps;
	this.step_index = 0;
	
	this.advanceScene = function() {
		var next_step = this.steps[this.step_index];
		
		if(next_step !== undefined) {
			next_step.call();
			this.step_index += 1;
			return true;
		} else {
			return false;
		}
	};
	
	return this;
}

var RubyAiScript = function(game, contents) {
	this.game = game;
	this.contents = contents;
	
	this.addScene = function(name, scene_contents) {
		this.game.scenes[name] = scene_contents;
	};
	
	this.contents();
	
	return this;
};

var Option = function() {
	return this;
};
