FoxModel = Backbone.Model.extend({
    defaults: {
    	state:"left_up",
    	anchors: []
	},
	
	initialize: function(){
		var self = this;
		
		self._startKeylogger();
		self._startListening();
	},

	_startListening: function(){
		var self = this;

		_.each(self.get("anchors"), function(val, key, list){
			console.log(arguments);
			val.bind('clicked', function(data){
				self._changeState(data.state);
			});
		});
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