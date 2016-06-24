var Grid = function( bgColor, color, cellSize, width, height ) {
	var grid = this;
	grid.center = new Point( view.center );
	grid.maxZoom = 2.5;
	grid.minZoom = 0.5;

	// Set default values
	grid.bgColor = bgColor || "lightgrey";
	grid.color = color || "white";
	grid.cellSize = cellSize || 50;
	grid.width = width || 4000;
	grid.height = height || 4000;

	// Setup canvas
	view.viewSize.width = window.innerWidth;
	view.viewSize.height = window.innerHeight;
	document.getElementById( "grid" ).style.backgroundColor = grid.bgColor;

	// Define components
	grid.layer = new Layer();
	grid.group;
	grid.intersections;
	grid.draw();
};

Grid.prototype.resize = function() {
	view.viewSize.width = window.innerWidth;
	view.viewSize.height = window.innerHeight;
}

Grid.prototype.move = function( dX, dY, spd ) {
	var grid = this;
	var bounds = view.bounds;
	if ( Math.abs( bounds.left + dX * spd ) > grid.width / 2 || Math.abs( bounds.right + dX * spd ) > grid.width / 2 ) return false;
	if ( Math.abs( bounds.top + dY * spd ) > grid.height / 2 || Math.abs( bounds.bottom + dY * spd ) > grid.height / 2 ) return false;
	view.center = new Point( view.center.x + dX * spd, view.center.y + dY * spd );
	view.update();
}


Grid.prototype.zoom = function( factor ) {
	var grid = this;
	var newZoom = Math.fround( view.zoom + factor );
	if ( newZoom > grid.maxZoom || newZoom < grid.minZoom ) return false;
	view.zoom += factor;
	if ( Math.abs( view.bounds.top ) > grid.height / 2 ) {
		view.center = new Point( view.center.x, view.center.y + ( Math.abs( view.bounds.top ) - grid.height / 2 ) );
	}
	if ( Math.abs( view.bounds.bottom ) > grid.height / 2 ) {
		view.center = new Point( view.center.x, view.center.y - ( Math.abs( view.bounds.bottom ) - grid.height / 2 ) );
	}
	if ( Math.abs( view.bounds.left ) > grid.width / 2 ) {
		view.center = new Point( view.center.x + ( Math.abs( view.bounds.left ) - grid.width / 2 ), view.center.y );
	}
	if ( Math.abs( view.bounds.right ) > grid.width / 2 ) {
		view.center = new Point( view.center.x - ( Math.abs( view.bounds.right ) - grid.width / 2 ), view.center.y );
	}
	view.update();
}

Grid.prototype.draw = function( cellSize, width, height ) {
	var grid = this;
	var cellSize = cellSize || grid.cellSize;
	grid.width = width || grid.width;
	grid.height = height || grid.height;

	var boundingRect = view.bounds;
	var num_rectangles_wide = grid.width / cellSize;
	var num_rectangles_tall = grid.height / cellSize;

	grid.create = function() {
		grid.group = new Group();
		grid.intersections = new Array();

		var x = view.center.x;
		var y = view.center.y;
		var leftBounds = grid.width / -2;
		var topBounds = grid.height / -2;
		for ( var i = 0; i <= num_rectangles_wide; i++ ) {
			var xPos = leftBounds + i * cellSize;
			if ( xPos > boundingRect.left && xPos < boundingRect.right ) {
				var topPoint = new Point( xPos, boundingRect.top );
				var bottomPoint = new Point( xPos, boundingRect.bottom );
				var gridLine = new Path.Line( topPoint, bottomPoint );
				gridLine.strokeColor = grid.color;
				gridLine.strokeWidth = 1 / view.zoom;
				grid.group.addChild( gridLine );
			}
		}
		var endOfFirstHalf = grid.group.children.length;
		var startOfSecondHalf = endOfFirstHalf + 1;
		for ( var i = 0; i <= num_rectangles_tall; i++ ) {
			var yPos = topBounds + i * cellSize;
			if ( yPos > boundingRect.top && yPos < boundingRect.bottom ) {
				var leftPoint = new Point( boundingRect.left, yPos );
				var rightPoint = new Point( boundingRect.right, yPos );
				var gridLine = new Path.Line( leftPoint, rightPoint );
				gridLine.strokeColor = grid.color;
				gridLine.strokeWidth = 1 / view.zoom;
				grid.group.addChild( gridLine );
			}
		}

		// Find intersections
		for ( var i = 0; i <= endOfFirstHalf; i++ ) {
			var iChild = grid.group.children[ i ];
			for ( var j = endOfFirstHalf; j <= grid.group.children.length; j++ ) {
				var jChild = grid.group.children[ j ];
				var intersections = iChild.getIntersections( jChild );
				for ( var k = 0; k < intersections.length; k++ ) {
					grid.intersections.push( intersections[ k ].point );
				}
			}
		}

		grid.group.sendToBack();
		view.update();
	}

	grid.remove = function() {
		for ( var i = 0; i < grid.group.children.length - 1; i++ ) {
			grid.group.children[ i ].remove();
		}
		grid.group.remove();
	}

	if ( typeof grid.group === 'undefined' ) {
		grid.create();
	} else {
		grid.remove();
		grid.create();
	}
}
