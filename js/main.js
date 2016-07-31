paper.install( window );

var grid;

window.onload = function() {
	paper.setup( 'grid' );

	grid = new Grid();

	window.onkeydown = function( event ) {
		var key;
		//console.log( event.keyCode );
		switch ( event.keyCode ) {
			case 38:
				key = "up";
				grid.move( 0, -1, 10 );
				grid.draw();
				break;
			case 40:
				key = "down";
				grid.move( 0, 1, 10 );
				grid.draw();
				break;
			case 37:
				key = "left";
				grid.move( -1, 0, 10 );
				grid.draw();
				break;
			case 39:
				key = "right"
				grid.move( 1, 0, 10 );
				grid.draw();
				break;
			case 187: //(+)
				if ( event.shiftKey ) {
					grid.zoom( 0.1 );
					grid.draw();
				}
				break;
			case 189: //(-)
				if ( event.shiftKey ) {
					grid.zoom( -0.1 );
					grid.draw();
				}
				break;
		}

		window.onresize = function() {
			grid.resize();
			grid.draw();
		}
	}

	view.draw();
}
