function Automate () {

	this.elements = {
		next : document.querySelector("blabla"),
		all  : document.querySelector("blabla"),
	}
	
	this.timeOutId = null;

	this.selectAllAndNext = function() {
		var nextButton = this.elements.next; 
		var selectAll  = this.elements.all;
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