var index = 0;

function addPerson(){
    console.log( 'in addPerson' );
    // verify no empties
    if( $( '#nameIn' ).val() === '' || $( '#factIn' ).val() === '' ){
        alert( 'no empties' );
    } // end empties
    else{
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
    } // end no empties
} // end addPerson

function deletePerson(){
    // what is the index of the person we want to remove?
    console.log( 'in deletePerson. Index:', $(this).data( 'index' ) );
    // put index in an object
    var objectToSend ={
        index: $(this).data( 'index' )
    }; // end objectTOSend
    // make DELETE call to /person via AJAX to remove person with this index
    $.ajax({
        method: 'DELETE',
        url: '/person',
        data: objectToSend,
        success: function( response ){
            console.log( 'back from DELETE call with:', response );
            // update DOM
            getPeople();
        } //end success
    }); //end ajax
} // end deletePerson

function getPeople(){
    // GET call to /person
    $.ajax({
        method: 'GET',
        url: '/person',
        success: function( response ){
            console.log( 'back from GET with:', response );
            showPerson( response.people );
        } // end success
    }); //end ajax
} // end getPeople

function nextPerson(){
    console.log( 'in nextPerson' );
    // increment index
    index++;
    // wrap if needed
    // show next person
    getPeople();
} // end 

function prevPerson(){
    console.log( 'in prevPerson' );
    // decrement index
    index--;
    // wrap if needed
    // show next person
    getPeople();
} // end 

function readyNow(){
    // get people already on server
    getPeople();
    // event listener for the add person button
    $( '#addPersonButton' ).on( 'click', addPerson );
    $( '#output' ).on( 'click', '#prevButton', prevPerson );
    $( '#output' ).on( 'click', '#nextButton', nextPerson );
    $( '#output' ).on( 'click', '#deleteButton', deletePerson );
} // end ready funk

function showPerson( peopleArray ){
    console.log( 'in showPerson' );
    // only show output if there are people
    if( peopleArray.length > 0 ){
         // wrap index if too high or too low
        if( index < 0 ){
            index = peopleArray.length-1;
        } // end wrap too high
        else if( index >= peopleArray.length ){
            index = 0;
        } // end wrap too low 
        // display the data on DOM
        var $el = $( '#output' );
        // empty the output element
        $el.empty();
        // display just one person
        var $personP = $( '<p>', { text: peopleArray[index].name + ': ' + peopleArray[index].fact } );
        var $countP = $( '<p>', { text: (index + 1) + '/' + peopleArray.length } );
        var $prevButton = $( '<button>', { text: '<-', id: 'prevButton' } );
        var $nextButton = $( '<button>', { text: '->', id: 'nextButton' } );
        var $deleteButton = $( '<button>', { text: 'Delete', id: 'deleteButton', 'data-index': index } );
        var $controlsP = $( '<p>', { text: 'controls: ' } );
        $controlsP.append( $prevButton );
        $controlsP.append( $nextButton );
        $controlsP.append( $deleteButton );
        $el.append( $personP );
        $el.append( $countP );
        $el.append( $controlsP );
    } // end people.length > 0
} // end showPerson

$( document ).ready( readyNow );