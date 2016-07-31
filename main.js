<<<<<<< HEAD
var app = require( 'app' ); // Module to control application life.
var BrowserWindow = require( 'browser-window' ); // Module to create native browser window.

// Report crashes to our server.
require( 'crash-reporter' ).start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if ( process.platform != 'darwin' ) {
		app.quit();
	}
} );

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on( 'ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow( {
		width: 800,
		height: 600
	} );

	// and load the index.html of the app.
	mainWindow.loadUrl( 'file://' + __dirname + '/index.html' );

	// Open the DevTools.
	//mainWindow.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on( 'closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	} );
} );
=======
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
				console.log("'+'");
				if ( event.shiftKey ) {
					console.log("shift + '+'");
					grid.zoom( 0.1 );
					grid.draw();
				}
				break;
			case 189: //(-)
				console.log("'-'");
				if ( event.shiftKey ) {
					console.log("shift + '-'");
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
>>>>>>> f0a6c07af2130619eb4d036560a0e9145bbced22
