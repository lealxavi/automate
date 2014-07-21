	function Automate () {

		this.timeoutId = null;

		this.elements = {

		}

		this.constants = {
			numberOfElements : 300,
			timeBetweenRequests : 2000,
		}

		this.buttons = [];
		this.otherButtons = [];

		this.getElements = function () {
			
			var elements = document.querySelectorAll(this.elements.element);
			
			for (var i = 0; i<elements.length; i++) {		
				var identifier = parseInt(elements[i].dataset[this.elements.userId]);
				
				if(!isNaN(identifier)) {
					var user = {
						element           : document.querySelector(this.getElementId(identifier)),
						name              : elements[i].dataset[this.elements.userName],
						surname           : elements[i].dataset[this.elements.userSurname],
						elementBody       : document.querySelector(this.getElementId(identifier) + " " + this.elements.elementBody),
						shortDescription  : document.querySelector(this.getElementId(identifier) + " " + this.elements.userDescription).innerText,
						place             : document.querySelector(this.getElementId(identifier) + " " + this.elements.userPlace).innerText,
						button            : document.querySelector(this.getElementId(identifier) + " " + this.elements.userButton),
						otherButtons      : document.querySelector(this.getElementId(identifier) + " " + this.elements.userOtherButton),
					};
	
					if (user.place.indexOf(this.elements.meanCity) > -1) {
					 	this.buttons.push(user.button);
					} else if (user.place.indexOf(this.elements.badCity) > -1) {
						this.otherButtons.push(user.otherButtons);
					}
				}
			}

			console.log("Users " + this.buttons.length);
			this.pressButtons();
		}

		this.pressButtons = function() {

			if(this.buttons.length>0) {
				var button = this.buttons.pop();
				var _this  = this;
				this.fireEvent(button,"click");
				this.timeoutId = setTimeout(function() {_this.pressButtons()},this.constants.timeBetweenRequests);
			} else {
				console.log("Finished Press Buttons");
				this.pressOtherButtons();
			}

		}

		this.pressOtherButtons = function() {

			if(this.otherButtons.length>0) {
				var otherButtons = this.otherButtons.pop();
				var _this  = this;
				this.fireEvent(otherButtons,"click");
				this.timeoutId = setTimeout(function() {_this.pressOtherButtons()},this.constants.timeBetweenRequests);
			} else {
				console.log("Finished Pressing Other Buttons");
			}

		}

		this.prepareElements = function() {
			var elements      = document.querySelectorAll(this.elements.element);
			var nextButton    = document.querySelector(this.elements.nextButton);
			var _this         = this;

			if (elements.length<this.constants.numberOfElements) {
				_this.fireEvent(nextButton,"click");
				_this.timeoutId = setTimeout(function() {_this.prepareElements()},this.constants.timeBetweenRequests);
				console.log("Elements : " + elements.length);
			} else {
				_this.getElements();
			}
		}

		this.getElementId = function (id) {
			return this.elements.elementPrefix+id; 
		}

		this.fireEvent = function (el, etype){
	  		if (el.fireEvent) {
	    		(el.fireEvent('on' + etype));
	  		} else {
	    		var evObj = document.createEvent('Events');
	    		evObj.initEvent(etype, true, false);
	    		el.dispatchEvent(evObj);
	  		}
		}

		this.stopAll = function() {
			clearTimeout(this.timeoutId);
		}

		this.prepareElements();

	} var AutomateObj = new Automate();