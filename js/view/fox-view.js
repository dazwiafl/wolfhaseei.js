var FoxView = Backbone.View.extend({

  	tagName: "div",

	className: "fox",

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

    },

	change:function() {
		var self = this,
			whichstate = self.model.get("state");

		self.$el
			.removeClass('left_up')
			.removeClass('left_down')
			.removeClass('right_up')
			.removeClass('right_down')
			.addClass(whichstate);
	}

});