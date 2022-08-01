(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(ypos,outerDiv){
		var $this = $(this);
		var firstTop;
		var _top;

		if (arguments.length < 1 || ypos === null) ypos = 0;
		if (arguments.length < 2 || outerDiv === null) outerDiv = 'body';

		$this.each(function(){
		  firstTop = $this.offset().top;
			var _transform = $this.css("transform");
			var matrixArr = _transform.split(',');
			_top = parseInt(matrixArr[5]);
		});

		function update(){
			var pos_y = $window.scrollTop();
			var t_y = $(outerDiv).offset().top;
			$this.each(function(){
				var $element = $(this);
				var _transform = $element.css("transform");
				var matrixArr = _transform.split(',');
				if((pos_y - t_y < 0) || (pos_y - t_y == 0)){
					return;
				}

				if(ypos===0)return;
				var _left = parseInt(matrixArr[4]);

				var t_top = Math.round(Math.round((_top - (pos_y - t_y)) * ypos));
				$this.css('transform','translate('+_left+'px,'+t_top+'px)');
			});
		}

		$window.bind('scroll', update).resize(update);
		update();
	}
})(jQuery);
