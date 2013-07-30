var FailsView = Backbone.View.extend({

  tagName: "div",

	className: "fails",

  events: {
  
  },

	initialize: function() {
		var self = this;

		self.__fails = 0;
		self.initialRender();
  },

  initialRender: function(){
    var i,
        self = this;

    for(i = 0; i < self.options.allowed; i++){
      var img = $("<div />").addClass("failPoint").hide().data('cnt', i);
      self.$el.append(img);
    }
  },

	render: function() {
		var self = this;

		self.$el.children().each(function(){
      if($(this).data('cnt') < self.__fails)
        $(this).show();
      else
        $(this).hide();
    });
  },

  addPoint: function(){
    var self = this;

    self.__fails++;
    self.render();
  }
});