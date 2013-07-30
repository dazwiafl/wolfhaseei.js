var RabbitView = Backbone.View.extend({

  	tagName: "div",

	className: "rabbit",

  	events: {
    	/*"click .icon":          "open",
    	"click .button.edit":   "openEditDialog",
    	"click .button.delete": "destroy"*/
    },

	initialize: function() {
		var self = this;

		self.listenTo(this.model, "change", this.change);
		self.render();
		self.change();
  	},

	render: function() {
		var self = this;

		self.$el.hide();
    },

	change:function() {
		var self = this,
			state = self.model.get("state");

		if(state == "on")
			self.$el.show();
		else
			self.$el.hide();
	}

});