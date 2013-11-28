// JD: The overall $(function () { }); wrapper is meant to appear
//     just once.  These are not technically wrong, but they lose
//     the possibility of shared scope.
$(function () {
    $("#help-button").popover();
});

$(function () {
    $("#help-button-CharAdding").popover();
});

$(function () {
    $("#help-button-Deletion").popover();
});


/* JD: Acccck, we are now outside of a $(function () { }); !!!
       We shouldn't be. */

/*  '<tr>' +
          '<td><input type="checkbox" value="0"></td>' +
          '<td><a href="character.html#11111"></a></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
        '</tr>';
        */

/* JD: This is nice; I like that you went for something distinct from a table
       or list.  Note that you can indent the string parts for readability.
       Plus, you should continue to format your HTML consistently here. */
var characterRowTemplate = 
	'<div class="col-sm-6 col-md-3">' +
    '<div class="thumbnail">' +
    '<img data-src="holder.js/300x200" alt="Character">' +
    '<div class="caption">' +
    '<h3 id = "idOfCharToChange"></h3>' +
    '<p id = "idOfChar" ><strong>ID: </strong><em></em></p>' +
    '<p id = "classOfChar" ><strong>Class: </strong><em></em></p>' +
    '<p id = "Gender"><strong>Gender: </strong><em></em></p>' +
    '<p id = "Level"><strong>Level: </strong><em></em></p>' +
    '<p id = "Money"><strong>Money: </strong><em></em></p>' +
    '<p><button type="button" data-toggle="modal" href="#editModal" class="btn btn-primary">Edit</button>' +
    '<a id= "delete-button" data-toggle="modal" href="#deleteModal" class="btn btn-danger">Delete</a>' +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

$.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
    // JD: Indent this function.
function (characters) {
    // Do something with the character list.
    characters.forEach(function (character) {
        var $characterRow = $(characterRowTemplate);
        $characterRow.find("h3")
            .attr({
            title: character.id
        })
            .text(character.name)
        /* JD: Nicely done except...once you start cloning the template, you start
               getting duplicate IDs, which is a no-no.  They only happen to work
               here because you are using find, restricted to the newly-created
               $characterRow.  But in general you shouldn't do this.  You can just
               use additional classes, for example, to identify the different elements
               that need to be customized. */
        $characterRow.find("#idOfChar > em")
            .text(character.id);
        $characterRow.find("#classOfChar > em  ")
            .text(character.classType);
        $characterRow.find("#Gender > em")
            .text(character.gender);
        $characterRow.find("#Level > em")
            .text(character.level);
        $characterRow.find("#Money > em")
            .text(character.money);
        $("#character-table").append($characterRow);
    });
});



var characterRowTemplate2 = 
            '<div class="col-md-4">'+
                '<p></p>'+
                '<p><strong>Please choose one of the available characters to play.</strong></p>'+
                '<select multiple="" id = "scroll" class="form-control">'+
                    	'<option id = "charName"></option>'+
                        '</select>'+
                        '<p></p>'+
          			    '<button id="Select" type="button" class="btn btn-primary">Select</button>'+
            '</div>';


/* JD: This is a wasted JSON call---you already loaded the characters in the
       previous one!  I don't know why you did this separately.  You should
       consolidate this with the other function in order to save yourself
       an additional network round trip. */
$.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
function (characters) {
    // Do something with the character list.
    /* JD: I think, you are replicating the wrong template here.  The instructions
           and select elements should be permanent, and single; it is only the
           option elements that you are creating multiples of.  At least as far
           as I can tell. */
    // JD: This is why, in case you noticed, only the last character shows up.
    //     Well, the other reason is that you never append $characterRow1 to
    //     the page.  So anyway those are why this is not acting as you intended.
    var $characterRow1 = $(characterRowTemplate2);
    characters.forEach(function (character) {
        $characterRow1.find("#scroll > #charName")
            .text(character.name);
        $("#character-scroll").append($characterRow1);
    });

    /* JD: In any case, I would question the design decision to include select
           element.  You already have a player-by-player "card" showing their
           information with Edit and Delete buttons.  Why not have a Select
           button then, one per character? */
});

// JD: OK, the part below is REALLY broken.  It reveals some big gaps in
//     your understanding.
$(function () {
/*    $.getJSON(
    function (characters) {
        characters.forEach(function (character) {
            var $characterRow = $(characterRowTemplate);
            console.log("that's your ID#" + character.id);
        });
    });*/
    // JD: You do realize that this string does nothing, yes?
    "http://lmu-diabolical.appspot.com/characters",
    $("#confirmDelete").click(function () {
        // JD: You are about to delete a character!  Why are you creating
        //     another character row template?
    	 var $characterRow3 = $(characterRowTemplate);

        // JD: I see what you are trying to do here but it is simply looking
        //     in the wrong place.  Thus, you get the wrong ID.
        var idToChange =$("#idOfCharToChange").attr('title');
        console.log("thisss " + idToChange);
        // JD: If you *had* the right ID, then the call below would work...
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/" + idToChange,
            success: function (data, textStatus, jqXHR) {
                console.log("Gone baby gone.");
                // JD: ...but you need a better callback; one that actually
                //     gives a visual signal that the character did get deleted.
            }
        });

        console.log("Hey, it's been clicked");
        //dismissing the modal
        $('#deleteModal').modal('hide') // JD: Missing semicolon.
    });
});