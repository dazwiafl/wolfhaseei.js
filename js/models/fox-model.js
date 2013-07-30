FoxModel = Backbone.Model.extend({
    defaults: {
    	state:"left_up"
	},
	
	initialize: function(){
		var self = this;
		
		self._startKeylogger();
	},

	_startKeylogger: function(){
		var self = this;
		$('body').keydown(function(evt){
			var whichKey = evt.keyCode;

			switch(whichKey){
				case 81: self._changeState("left_up"); break;
				case 65: self._changeState("left_down"); break;
				case 80: self._changeState("right_up"); break;
				case 76: self._changeState("right_down"); break;
				default: console.log("keyNotMapped"); break;
			}
		});
	},

	_changeState: function(state){
		var self = this;

		//console.log(state);

		self.set("state", state);
	}
});