var EiView = Backbone.View.extend({

  	tagName: "div",

	className: "egg",

  	events: {
    },

	initialize: function() {
		var self = this;

		self.listenTo(self.model, "change:position", self._change);
		self.listenTo(self.model, "change:active", self._onActiveChange);
		self.listenTo(self.model, "change:catched", self._isCatched);
		self.listenTo(self.model, "change:failed", self._failed);
		self.render();
  	},

	render: function() {
		var self = this;

		self.$el
			.addClass(self.model.get("state"))
			.addClass("pos1");
    },

	_change:function() {
		var self = this,
			whichposition = self.model.get("position");

		self.$el
			.removeClass("pos"+(whichposition-1))
			.addClass("pos"+whichposition);
	},

	_onActiveChange: function(){
		var self = this;

		if(!self.model.get("active"))
			self.destroy();
	},

	_isCatched: function(){
		var self = this;

		self.$el.addClass("catched");
	},

	_failed: function(){
		var self = this,
			dir = self.model.get("state");

		dir = dir.substring(0, dir.indexOf("_"));

		self.$el.addClass("fail-"+dir);
	},

	destroy: function(){
		var self = this;

		self.$el.remove();
		self.stopListening();

		self = null;
	}

});