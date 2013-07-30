var FoxAnchorView = Backbone.View.extend({

  	tagName: "a",

	className: "fox-anchor",

  	events: {
    	"click": "onClick",
    	"touchstart": "onClick"
    },

	initialize: function() {
		var self = this;

		self.render();
  	},

	render: function() {
		var self = this;

		self.$el.attr('href', '#').addClass(self.options._class);
		self.options._parent.append(self.$el);
    },

    onClick: function(e){
    	var self = this,
    		state = self.options._class == "anchorLU"
    					?
    						"left_up"
    						:
    						self.options._class == "anchorLD"
    							?
    								"left_down"
    								:
    								self.options._class == "anchorRU"
    									?
    										"right_up"
    										:
    										"right_down";
    		;

    	e.preventDefault();
    	e.stopPropagation();

    	self.trigger('clicked', {state:state});
    }

});