function Automate () {

	this.elements = {
		next : "blabla",
		all  : "blabla",
	}
	
	this.timeOutId = null;

	this.selectAllAndNext = function() {
		var nextButton = document.querySelector(this.elements.next); 
		var selectAll  = document.querySelector(this.elements.all);
		console.log(nextButton);
		console.log(selectAll);
		this.fireEvent(selectAll,"click");
		this.fireEvent(nextButton,"click");

		var _this = this;
		_this.timeOutId = setTimeout(function() {_this.selectAllAndNext()},2000);
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

	this.stopAll = function () {
		clearTimeout(this.timeOutId);
	}

} var AutomateObj = new Automate();