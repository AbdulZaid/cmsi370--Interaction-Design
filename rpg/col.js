$(function () {
    $("#help-button").popover();
});

$(function () {
    $("#help-button1").popover();
});

$(function () {
    $("#help-button2").popover();
});




/*  '<tr>' +
          '<td><input type="checkbox" value="0"></td>' +
          '<td><a href="character.html#11111"></a></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
        '</tr>';
        */

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
    '<a id= "delete-button" data-toggle="modal" href="#deleteModel" class="btn btn-danger">Delete</a>' +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

$.getJSON(
    "http://lmu-diabolical.appspot.com/characters",

function (characters) {
    // Do something with the character list.
    characters.forEach(function (character) {
        var $characterRow = $(characterRowTemplate);
        $characterRow.find("h3")
            .attr({
            title: character.id
        })
            .text(character.name)
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


$.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
function (characters) {
    // Do something with the character list.
    var $characterRow1 = $(characterRowTemplate2);
    characters.forEach(function (character) {
        $characterRow1.find("#scroll > #charName")
            .text(character.name);
        $("#character-scroll").append($characterRow1);
    });
});

$(function () {
/*    $.getJSON(
    function (characters) {
        characters.forEach(function (character) {
            var $characterRow = $(characterRowTemplate);
            console.log("that's your ID#" + character.id);
        });
    });*/
    "http://lmu-diabolical.appspot.com/characters",
    $("#confirmDelete").click(function () {
    	 var $characterRow3 = $(characterRowTemplate);
    
        var idToChange =$("#idOfCharToChange").attr('title');
        console.log("thisss " + idToChange);
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/" + idToChange,
            success: function (data, textStatus, jqXHR) {
                console.log("Gone baby gone.");
            }
        });

        console.log("Hey, it's been clicked");
        //dismissing the modal
        $('#deleteModel').modal('hide')
    });
});