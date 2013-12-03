$(function() {
  //Send on "enter" click.
  $("#textbox").keypress(function(event) {
    if(event.which == 13) { //when enter is hit.
         if($("#enter").prop("checked")) { //see if box is checked.
             var textValue = $("#textbox").val();
             var currentText = $("#container").html();
             $("#container").html(currentText + "<br>"  + textValue);
             $("#textbox").val(" ");//clear out the text field.
             event.preventDefault(); // to prevent jumping a space when hitting enter.
         }
      }
    });
  
  //send when "send button" is clicked.
  $("#send").click(function(){
        var textValue = $("#textbox").val();
        var currentText = $("#container").html();
        $("#container").html(currentText + "<br>" + textValue);
        $("#textbox").val(" ");
    });
  
  });