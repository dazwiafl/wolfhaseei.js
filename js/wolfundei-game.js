function WolfUndEiGame($el){
	var self = this;
	
	self._$mainView = $el;
	
	self.__allowedFails = 3;
	self.__fails = 0;
	self.__gameKilled = false;


	/* FOX START */
	self.__fox_anchorLU = new FoxAnchorView({_class:'anchorLU', _parent:self._$mainView});
	self.__fox_anchorLD = new FoxAnchorView({_class:'anchorLD', _parent:self._$mainView});
	self.__fox_anchorRU = new FoxAnchorView({_class:'anchorRU', _parent:self._$mainView});
	self.__fox_anchorRD = new FoxAnchorView({_class:'anchorRD', _parent:self._$mainView});

	self.__fox_model = new FoxModel({
		anchors: [
			self.__fox_anchorRD,
			self.__fox_anchorRU,
			self.__fox_anchorLD,
			self.__fox_anchorLU
		]
	});
	self.__fox_view = new FoxView({
		model: self.__fox_model
	});

	self._$mainView.append(self.__fox_view.$el);
	/* FOX END */

	/* RABBIT START */
	self.__rabbit_model = new RabbitModel();
	self.__rabbit_view = new RabbitView({
		model: self.__rabbit_model
	});

	self._$mainView.append(self.__rabbit_view.$el);
	/* RABBIT END */

	/* POINTS START */

	self.__points_view = new PointsView();
	self._$mainView.append(self.__points_view.$el);

	/* POINTS END */

	/* FAILS START*/
	self.__fails_view = new FailsView({allowed:self.__allowedFails});
	self._$mainView.append(self.__fails_view.$el);
	/* FAILS END*/

	/* EIER START */

	self._createNewEi = function(){
		var ei = new EiModel({state:self._getRandomEiState()}),
			ei_view = new EiView({model: ei});

		self._$mainView.append( ei_view.$el );

		self.__eier.push( ei );
	};

	self._getRandomEiState = function(){
		var rand = _.random(1, 4);

		switch(rand){
			case 1: return "left_up";
			case 2: return "left_down";
			case 3: return "right_up";
			case 4: return "right_down"; 
		}

		return "left_up";
	};

	self._addFail = function(){
		var self = this;

		self.__fails++;

		self.__rabbit_model.changeState(self.__fails);

		self._playSound("fail");

		if(self.__fails == self.__allowedFails)
			self._killGame();
	};

	self._killGame = function(){
		clearTimeout(self.__timeoutID);
		while(self.__eier.length > 0){
			self.__eier[0].destroy();

			self.__eier.splice(0,1);
		}
		self._playSound("gameover");
//		self._$mainView.after().append("<p>GAME OVER</p>");
		self.__gameKilled = true;
	};

	self.__eier = new Array();

	self._createNewEi();

	/* EIER END */


	/* SOUNDS START */
	self._playSound = function(which){
		var def = {
			"catch": ['sounds/catch.mp3', 'sounds/catch.ogg', 'sounds/catch.wav'],
			"fail": ['sounds/fail.mp3', 'sounds/fail.ogg', 'sounds/fail.wav'],
			"gameover": ['sounds/gameover.mp3', 'sounds/gameover.ogg', 'sounds/gameover.wav'] 
		};

		var sound = new Howl({
		  urls: def[which],
		  autoplay: true,
		  loop: false,
		  volume: 0.5,
		  onend: function() {
		    
		  }
		});
	};
	/* SOUNDS END */

	/* GAME-LOOP START */

	self.__timing = 1000;

	self._loop = function(){

		var removeable_eggs = new Array();

		_.each(self.__eier, function(ei){
			var ns_return = ei.nextState();

			if(ns_return == "catchable"){
				if(ei.get("state") == self.__fox_model.get("state")){
					console.log("GEFANGEN!!");
					self._playSound("catch");
					ei.catched();
					self.__points_view.addPoint();
					removeable_eggs.push(ei);
				}
				else{
					console.log("NICHT GEFANGEN!");
					ei.fail();
					self.__fails_view.addPoint();
					self._addFail();
				}
			}else if(ns_return == "dead"){
				ei.destroy();
				removeable_eggs.push(ei);
			}
		});

		if(self.__gameKilled)
			return;

		while(removeable_eggs.length > 0){
			self.__eier = _.without(self.__eier, removeable_eggs[0]);
			removeable_eggs[0].destroy();

			removeable_eggs.splice(0,1);
		}

		if(_.random(0,1) == 0)
			self._createNewEi();
		
		self.__timeoutID = setTimeout(function(){ self._loop(); }, self.__timing);
	};


	self.__timeoutID = setTimeout(function(){ self._loop(); }, self.__timing);
	/* GAME-LOOP END */

};