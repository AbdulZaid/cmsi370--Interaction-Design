
$(function () {
      $("#help-button-editing").popover();
      
      $("#help-button-CharAdding").popover();
      
      $("#help-button-Deletion").popover();
});


var characterRowTemplate =
        '<div class="col-sm-6 col-md-3">' +
        '<div class="thumbnail">' +
        '<img data-src="holder.js/300x200" alt="Character">' +
        '<div  id = "" class="caption">' +
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

          //adding the list of characters ( the first method implemented from LMU Diabolical)."
          "http://lmu-diabolical.appspot.com/characters",
          function (characters) {
          // Do something with the character list.
          characters.forEach(function (character) {
                 var $characterRow = $(characterRowTemplate);
                 $characterRow.find("#idOfCharToChange")
                 .text(character.name);
                 $characterRow.find("#current")
                 .text(character.id);
                 $characterRow.find(".caption")
                  .attr("id", character.id);
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

          //Creation function.( the Third method implemented from LMU Diabolical)."
          $("#createAChar").click(function () {
              
              //dismissing the modal
              $('#createModal').modal('hide');
                                  
              var characterAttr = {
                      name: $("#create-name").val(),
                      classType: $("#create-class").val(),
                      gender: $("#create-gender").val(),
                      level: $("#create-level").val(),
                      money: $("#create-money").val()
                      }; // JD2: This should be aligned with "characterAttr."
                      
              $.ajax({
                     type: 'POST',
                     url: "http://lmu-diabolical.appspot.com/characters",
                     data: JSON.stringify(characterAttr),
                     contentType: "application/json",
                     dataType: "json",
                     accept: "application/json",
                     complete: function (jqXHR, textStatus) {
                     // The new character can be accessed from the Location header.
                     console.log("You may access the new character at:" +
                                 jqXHR.getResponseHeader("Location"));
                     }
                     });
                });
          
          
          //deletion function.( the second method implemented from LMU Diabolical)."
          $("#confirmDelete").click(function () {
                var idOfCurrent = $(".caption").attr("id");
                console.log("current ID " + idOfCurrent);
                $.ajax({
                       type: 'DELETE',
                       url: "http://lmu-diabolical.appspot.com/characters/"+ idOfCurrent,
                       success: function (data, textStatus, jqXHR) {
                           // JD2: Relative to the above line, you should indent here.
                           //
                           //      Also, the console.log is not enough; you need to
                           //      update the user interface to show that the character
                           //      has been deleted.
                       console.log("Gone baby gone.");
                       }
                       });
                //dismissing the modal
                $('#deleteModal').modal('hide');
                });
          
          
          //Edition function.( the Third method implemented from LMU Diabolical)."
          $("#save-changes").click(function () {
               
               //dismissing the modal
               $('#editModal').modal('hide');
               
               var characterEditAttr = {
                       id: $(".caption").attr("id"), // try to get the delete button.
                       name: $("#edit-name").val(),
                       classType: $("#edit-class").val(),
                       gender: $("#edit-gender").val(),
                       level: $("#edit-level").val(),
                       money: $("#edit-money").val()
               };
                                   
               $.ajax({
                      type: 'PUT',
                      url: "http://lmu-diabolical.appspot.com/characters/"+ characterEditAttr.id,
                      data: JSON.stringify(characterEditAttr),
                      contentType: "application/json",
                      dataType: "json",
                      accept: "application/json",
                      success: function (data, textStatus, jqXHR) {
                          // JD2: Relative to the above line, you should indent here.
                          //
                          //      And yes, no news is good news in terms of the Ajax call,
                          //      but no news is *bad* news in terms of the user interface!
                      console.log("Done: no news is good news.");
                      }
                      });
               });
          }
);



