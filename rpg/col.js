
$(function () {
      $("#help-button-editing").popover();
      
      $("#help-button-CharAdding").popover();
      
      $("#help-button-Deletion").popover();
});


var characterRowTemplate =
        '<div class="col-sm-6 col-md-3">' +
        '<div class="thumbnail">' +
        '<img data-src="holder.js/300x200" alt="Character">' +
        '<div class="caption">' +
        '<h3 id = "idOfCharToChange"></h3>' +
        '<p id = "idOfChar" ><strong>ID: </strong><em id = "current"></em></p>' +
        '<p id = "classOfChar" ><strong>Class: </strong><em></em></p>' +
        '<p id = "Gender"><strong>Gender: </strong><em></em></p>' +
        '<p id = "Level"><strong>Level: </strong><em></em></p>' +
        '<p id = "Money"><strong>Money: </strong><em></em></p>' +
        '<p><button id="editCard" type="button" data-toggle="modal" href="#editModal" class="btn btn-primary">Edit</button>' +
        '<button id="Select" type="button" class="btn btn-success btn-sm">Select</button>'+
        '<a id= "delete-button" data-toggle="modal" href="#deleteModal" class="btn btn-danger">Delete</a>' +
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
                 $characterRow.find("#idOfCharToChange")
                 .text(character.name);
                 $characterRow.find("#current")
                 .text(character.id);
                 $characterRow.find("#classOfChar > em")
                 .text(character.classType);
                 $characterRow.find("#Gender > em")
                 .text(character.gender);
                 $characterRow.find("#Level > em")
                 .text(character.level);
                 $characterRow.find("#Money > em")
                 .text(character.money);
                 $("#character-table").append($characterRow);
                 
                 });
          //deletion function.
          $("#confirmDelete").click(function () {
                var idOfCurrent = $("#current").text();
                console.log("current ID " + idOfCurrent);
                $.ajax({
                       type: 'DELETE',
                       url: "http://lmu-diabolical.appspot.com/characters/"+ idOfCurrent,
                       success: function (data, textStatus, jqXHR) {
                       $("#" + idOfCurrent).remove();
                       console.log("Gone baby gone.");
                       }
                });
                //dismissing the modal
                $('#deleteModal').modal('hide');
                });
          }
);
