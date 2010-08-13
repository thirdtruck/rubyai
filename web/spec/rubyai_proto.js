function RubyAiGame() {
	this.show_stage = function(name, title, description) {
		console.log("Show stage: [", name, "] ", title, ": ", description);
	};
	this.show_character = function(alias, name, image) {
		console.log("Show stage: [", name, ": ", image, "]");
	};
	this.sound = function(name) {
		console.log("Sound: [", name, "]");
	};
	this.speak = function(name, content, description) {
		console.log("[", name, "] ", content, " (", description, ")");
	};
	this.action = function(name, content, description) {
		console.log("[", name, content, "] (", description, ")");
	};
	this.narrate = function(contents) {
		console.log(contents);
	};
	this.run_scene = function(scene_name) {
		this.current_crawler = new SceneCrawler(this.scenes[scene_name], this);
		this.current_crawler.advanceScript();
	};
	this.choose_from = function(options) {
		for(var option_index = 0; option_index < options.length; option_index++) {
			var option = options[option_index];
			console.log(option_index, ": ", option.description);
		}
		// temp to make it continue
		this.current_crawler = new SceneCrawler(options[0].contents, this);
		this.current_crawler.advanceScript();
	};
	
	this.current_crawler = null;
}

function Option(description, contents) {
	this.description = description;
	this.contents = contents;
}

function SceneCrawler(contents, game) {
	this.contents = contents;
	this.step_index = 0;
	this.game = game;
	this.parent_crawler = this.game.current_crawler;
	
	this.advanceScript = function() {
		var nextStep = this.contents[this.step_index];
		if(nextStep) {
			nextStep();
			this.step_index += 1;
			return true;
		} else {
			this.game.current_crawler = this.parent_crawler;
			if( ! this.parent_crawler ) {
				return false;
			}
		}
	};
}

function RubyAiScript(game, script_contents) {
	this.game = game;
	this.script = script_contents;
	
	this.game.scenes = {};
	this.addScene = function(scene_name, contents) {
		this.game.scenes[scene_name] = contents;
	};
	
	this.script();
	
	this.game.current_crawler = new SceneCrawler(this.game.scenes["intro"], this);
	this.game.current_crawler.advanceScript();
}

var rubyai_game = new RubyAiGame();
