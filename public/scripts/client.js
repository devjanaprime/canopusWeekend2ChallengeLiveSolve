function addPerson(){
    console.log( 'in addPerson' );
    // get user input & place in an object
    var objectToSend = {
        name: $( '#nameIn' ).val(),
        fact: $( '#factIn' ).val()
    }; // end objectToSend
    console.log( 'sending:', objectToSend );
    // send object to /person via POST via AJAX
    $.ajax({
        method: 'POST',
        url: '/person',
        data: objectToSend,
        success: function( response ){
            console.log( 'back from POST with:', response );
            // on success update the people on DOM
            getPeople();
            // and empty inputs
            $( '#nameIn' ).val( '' );
            $( '#factIn' ).val( '' );
        } // end success
    }); //end ajax
} // end addPerson

function getPeople(){
    // GET call to /person
    $.ajax({
        method: 'GET',
        url: '/person',
        success: function( response ){
            console.log( 'back from GET with:', response );
            // display the data on DOM
            var $el = $( '#output' );
            // empty the output element
            $el.empty();
            // loop through all people
            for( var i=0; i < response.people.length; i ++ ){
                // for each person, append a p tag to the output element
                var $p = $( '<p>', { 'text': response.people[i].name + ': ' + response.people[i].fact } );
                $el.append( $p );
            } // end for
        } // end success
    }); //end ajax
} // end getPeople

function readyNow(){
    // get people already on server
    getPeople();
    // event listener for the add person button
    $( '#addPersonButton' ).on( 'click', addPerson );
} // end ready funk

$( document ).ready( readyNow );