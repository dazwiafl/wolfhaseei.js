EiModel = Backbone.Model.extend({
    defaults: {
    	state:"left_up",
    	position: 1,
    	active: true,
    	catched: false,
    	failed: false
	},
	
	initialize: function(){
		var self = this;
	},

	nextState: function(){
		var self = this,
			newPosition = self.get("position")+1;

		self.set("position", newPosition);

		return (newPosition == 5) ? "catchable" : ( newPosition == 9 ? "dead" : "" );
	},

	catched: function(){
		var self = this;

		self.set("catched", true);
	},

	fail: function(){
		var self = this;

		self.set("failed", true);
	},

	destroy: function(){
		var self = this;

		self.set("active", false);
	}

});