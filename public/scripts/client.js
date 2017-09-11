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
            // and empty inputs
            $( '#nameIn' ).val( '' );
            $( '#factIn' ).val( '' );
        } // end success
    }); //end ajax
} // end addPerson

function readyNow(){
    $( '#addPersonButton' ).on( 'click', addPerson );
} // end ready funk

$( document ).ready( readyNow );