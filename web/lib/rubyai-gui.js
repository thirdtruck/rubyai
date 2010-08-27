var RubyAiGUI = function($top_element, settings) {
	this.settings = {
		max_rows : 4
	};
	$.extend(this.settings, settings);
	
	this.$top_element = $top_element;
	this.$top_element.empty();
	
	this.append = function(output) {
		this.$top_element.append(output);
		
		var total_elements = this.$top_element.children().length;
		while (total_elements > this.settings.max_rows) {
			this.$top_element.children(":first").remove();
			total_elements -= 1;
		}
	};
	
	this.showAllText = function(all_text) {
		this.$top_element.text(all_text);
	};
	
	this.addContent = function(new_content) {
		this.append(new_content);
	};
	
	this.narrate = function(statement) {
		this.append("<div class=\"narration\">"+statement+"</div>");
	};
	
	this.speak = function(character, statement) {
		this.append( "<div class=\"speech\"><span class=\"character\">" + character + ":</span><span class=\"statement\">" + statement + "</span></div>");
	};
	
	this.action = function(character, behavior) {
		this.append( "<div class=\"action\"><span class=\"character\">" + character + "</span> <span class=\"behavior\">" + behavior + "</span></div>");
	};
	
	this.sound = function(sound_name, sound_description) {
		this.append( "<div class=\"sound\">" + sound_description + "</div>");
	};
	
	this.showStage = function(alias, title, description) {
		this.append( "<div class=\"stage-title\">" + title + "</div><div class=\"stage-description\">" + description + "</div>");
	};
	
	this.showCharacter = function(alias, name, image) {
		this.append( "<div class=\"character-name\">" + name + "</div><div class=\"character-image\">" + image + "</div>");
	};
	
	this.hide = function(alias, name) {
		this.append( "<div class=\"event\">[Hide " + name + "]</div>");
	};
	
	this.codeBlock = function(code) {
		this.append( "<pre class=\"code-block\">" + code + "</pre>");
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
		this.append( "<div class=\"game-over " + final_status + "\">"+statement+"</div>");
	};
	
	this.choice = function(optionProcessorCallback, options) {
		var $results = $("<div class=\"choice\">Choose:</div>");

		for(var option_index = 0; option_index < options.length; option_index++) {
			var option = options[option_index];
			var printed_index = (option_index + 1)+"";
			
			var $link_element = $(
				"<a href=\"#\"><span class=\"index\">(" +
				printed_index +
				")</span> " + 
				option.name +
				"</a>"
			);

			var $option_element = $("<div class=\"option\" />");
			
			var $chosen_option_element = $("<div class=\"chosen-option\">" +
				"<span class=\"index\">(" +
				printed_index +
				")</span> " + 
				option.name +
				"</div>"
			);

			var optionClickCallback = (function () {
				var target_option = option;
				var $replacement_content = $chosen_option_element;
				return function () {
					$results.replaceWith($replacement_content);
					optionProcessorCallback.call(undefined, target_option);  // TODO: Figure out what happens to the first argument such that we have to put the one intended argument in the second slot
				}
			})();
			$link_element.click(optionClickCallback);
			
			$option_element.append($link_element);
			$results.append($option_element);
		}
		
		this.append( $results );
	};
	
	this.outputAsArray = function() {
		return this.output;
	};
	
	return this;
};
