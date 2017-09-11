// requires
var express = require( 'express' );
var app = express();
var index = require( './modules/routes/index' );
var person = require( './modules/routes/person' );

// globals 
var port = 7132;

// uses 
app.use( express.static( 'public' ) );
app.use( '/', index );
app.use( '/person', person );

// server spin up
app.listen( port, function(){
    console.log( 'server up on:', port );
}); //end server up