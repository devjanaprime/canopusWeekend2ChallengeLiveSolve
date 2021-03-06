var express = require( 'express' );
var router = express.Router();
var bodyParser = require( 'body-parser' );
router.use( bodyParser.urlencoded( { extended: true } ) );
// our peeps
var people =[];

router.delete( '/', function( req, res ){
    console.log( 'in /person DELETE:', req.body );
    // remove one person from the array at req.body.index
    people.splice( req.body.index, 1 );
    // log out people
    console.log( 'people:', people );
    res.send( 200 );
}); // end /person DELETE

router.get( '/', function( req, res ){
    console.log( 'in /person GET' );
    // place people array in side an object
    var objectToSend = {
        people: people
    }; // end objectToSend
    // respond with this object
    res.send( objectToSend );
}); // end /person GET

router.post( '/', function( req, res ){
    console.log( 'in /person POST:', req.body );
    // add this person to our array
    people.push( req.body );
    // log out people
    console.log( 'people:', people );
    res.send( 200 );
}); // end /person POST

module.exports = router;