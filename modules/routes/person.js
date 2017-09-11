var express = require( 'express' );
var router = express.Router();
var bodyParser = require( 'body-parser' );
router.use( bodyParser.urlencoded( { extended: true } ) );

router.get( '/', function( req, res ){
    console.log( 'in /person GET' );
    res.send( 'whinney' );
}); // end /person GET

router.post( '/', function( req, res ){
    console.log( 'in /person POST:', req.body );
    res.send( 'chirp' );
}); // end /person POST

module.exports = router;