function send_message(message) {
    $("#container").html("<span class = 'bot'>ChatBox: </span>" + message);
}

function username() {
    send_message("Hello, what's your name?");
}

$(function() {
  username();
  //Send on "enter" click.
  $("#textbox").keypress(function(event) {
    if(event.which == 13) { //when enter is hit.
         if($("#enter").prop("checked")) { //see if box is checked.
             var userName = "<span class = 'username' = >You: </span>";
             var textValue = $("#textbox").val();
             var currentText = $("#container").html();
             $("#container").html(currentText + "<br>" + userName + textValue);
             $("#textbox").val(" ");//clear out the text field.
             event.preventDefault(); // to prevent jumping a space when hitting enter.
             $("#container").scrollTop($("#container").prop("scrollHeight")); //to go directliy to the bottom when you send a new message.

         }
      }
    });
  
  //send when "send button" is clicked.
  $("#send").click(function(){
        var userName = "<span class = 'username' = >You: </span>";
        username();
        var textValue = $("#textbox").val();
        var currentText = $("#container").html();
        $("#container").html(currentText + "<br>" + userName +textValue);
        $("#textbox").val(" ");
        $("#container").scrollTop($("#container").prop("scrollHeight"));
                   
        });
  });

$(document).ready(function() {
                  $("#send").draggable();
        });
