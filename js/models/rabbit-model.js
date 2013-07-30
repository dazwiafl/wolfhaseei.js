RabbitModel = Backbone.Model.extend({
    defaults: {
    	state:"off",
    	countWhenActive: 2
	},
	
	initialize: function(){
		var self = this;
	},

	changeState: function(cnt){
		var self = this,
			val = cnt == self.get("countWhenActive") ? "on" : "off";

		self.set("state", val);
	}
});