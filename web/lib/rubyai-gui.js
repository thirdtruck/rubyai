var RubyAiGUI = function($top_element) {
	this.$top_element = $top_element;
	this.output = [];
	
	this.showAllText = function(all_text) {
		this.$top_element.text(all_text);
	};
	
	this.addContent = function(new_content) {
		this.output.push(new_content);
	};
	
	this.narrate = function(statement) {
		this.output.push("<div class=\"narration\">"+statement+"</div>");
	};
	
	this.speak = function(character, statement) {
		this.output.push( "<div class=\"speech\"><span class=\"character\">" + character + ":</span><span class=\"statement\">" + statement + "</span></div>");
	};
	
	this.action = function(character, behavior) {
		this.output.push( "<div class=\"action\"><span class=\"character\">" + character + "</span> <span class=\"behavior\">" + behavior + "</span></div>");
	};
	
	this.sound = function(sound_name, sound_description) {
		this.output.push( "<div class=\"sound\">" + sound_description + "</div>");
	};
	
	this.showStage = function(alias, title, description) {
		this.output.push( "<div class=\"stage-title\">" + title + "</div><div class=\"stage-description\">" + description + "</div>");
	};
	
	this.showCharacter = function(alias, name, image) {
		this.output.push( "<div class=\"character-name\">" + name + "</div><div class=\"character-image\">" + image + "</div>");
	};
	
	this.hide = function(alias, name) {
		this.output.push( "<div class=\"event\">[Hide " + name + "]</div>");
	};
	
	this.codeBlock = function(code) {
		this.output.push( "<pre class=\"code-block\">" + code + "</pre>");
	};
	
	this.gameOver = function(final_status) {
		var statement;
		if(final_status === "success") {
			statement = "Game Over!  You Win!";
		} else if(final_status === "failure") {
			statement = "Game Over!  You Lose!";
		} else {
			statement = "Game Over!";
			final_status = "neutral";
		}
		this.output.push( "<div class=\"game-over " + final_status + "\">"+statement+"</div>");
	};
	
	this.outputAsArray = function() {
		return this.output;
	};
	
	return this;
};
