var PointsView = Backbone.View.extend({

  	tagName: "div",

	className: "points",

  	events: {
    },

	initialize: function() {
		var self = this;

		self.__points = 0;
		self.render();
  	},

	render: function() {
		var self = this;

		self.$el.html(self.__points);
    },

    addPoint: function(){
    	var self = this;

    	self.__points++;
    	self.render();
    }
});