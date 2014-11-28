'use strict';
(function(window, document) {
	//initialyzing
	var _element = document.body;
	var paper = Raphael(_element, '100%', '100%');
	//TODO:get height n width from element
	var width = _element.clientWidth, 
		height = _element.clientHeight,
		cellsize = Math.min(width , height);
	
	var game = window.game = {};
	var manager = game.manager = new (function(){
		var manager = this;
		
		var min = 3, max = 20, level = min;
	
		//arrays
		var objects, numbers, letters, forms, sizes, colors, rules;
				
		this.start = function(){
			objects = [], numbers = [], letters=[], forms=[], sizes = [], colors = [], rules=[];
			
			forms.push();
			
			for(var i=1; i<=max*3;++i){
				numbers.push(i);
			};
			
			colorRangeGenerator.settings.makelog = true;
			colors = colorRangeGenerator.generate('f16752', 'fadeac', level);
			cellsize = Math.min(width , height) / (level*2);
			
			manager.show();
			//TODO: display a timer for hidding
			window.setTimeout(manager.hide, 5000/level);
		};
		
		this.show = function show(){
			for(var i = 0, j =level; i<j; i++){
				var o = new function(){
					var o = this; 
					o.i = i;
					
					var x, y, r;
					o.x = x = Math.random()*(width-2*cellsize)+cellsize;
					o.y = y = Math.random()*(height-2*cellsize)+cellsize;
					o.r = r = Math.max(Math.random(), 0.25) * cellsize;
				
					o.c = paper.circle(x, y, r);
					o.t = paper.text(x,y, numbers[i]);
					o.t.attr({ "font-size": r, "font-family": "Arial, Helvetica, sans-serif" });
					
					var point = o.point = paper.set();
					point.push(o.c,o.t);
				
					o.c.attr({fill : colors[i], stroke : null });
				};
				objects.push(o);
			};
		};
		
		//switches to play mode (when all the points are hidden)
		this.hide = function hide(){
			//TODO:darken the screen
			objects.forEach(function(e){
				e.point.hide();
				var censore = e.censore = paper.circle(e.x, e.y, cellsize*0.5);
				censore.attr({fill:'#000'});
				censore.click(function(){ onPointSelected(e); });
			});
			
			//TODO:show black dots and enlarge them
			//TODO:show the screen
		};
		
		this.pause = function(){};
		this.stop = function(){};
		
		function reset(){
			paper.clear();
			manager.start();
		};
	
		this.next = function(){
			//TODO: hyperbolic sin e growth of the complexity
			//TODO: tell that user is passing to the next level
			
			level++;
			reset();			
		};
		
		this.previous = function(){
			level--;
			reset();
		};
		
		function onPointSelected(e){
			console.log(e);
			
			if (check(e))
				reveal(e);
			else
				stop();
				
			if (objects.length==0)
				manager.next();			
		};
		
		function check(e){
			return objects.indexOf(e) == 0;
		};
		
		function reveal(e){
			e.censore.hide();
			e.point.show();
			if (objects.length>0)
				objects.shift();
		};
	});
	
	manager.start();
})(window, document, undefined);
