
function send_message(message) {
    $("#container").html("<span class = 'bot'>ChatBox: </span>" + message);
}

function username() {
    send_message("Hello, what's your name?");
}

$(function() {
  
  username();
  //Send on "enter" click.
  $(".textbox").keypress(function (event) {
    if(event.which == 13) { //when enter is hit.
       if($("#enter").prop("checked")) { //see if box is checked.
          var userName = "<span class = 'username' = >You: </span>";
          var textValue = $(".textbox").val();
          var currentText = $("#container").html();
          $("#container").html(currentText + "<br>" + userName + textValue);
          $(".textbox").val(" ");//clear out the text field.
          event.preventDefault(); // to prevent jumping a space when hitting enter.
          $("#container").scrollTop($("#container").prop("scrollHeight")); //to go directliy to the bottom when you send a new message.
         }
      }
    });

  $("#send").click(function (){
        var userName = "<span class = 'username' = >You: </span>";
        username(); // JD: I rest my case.
        var textValue = $(".textbox").val();
        var currentText = $("#container").html();
        $("#container").html(currentText + "<br>" + userName +textValue);
        $(".textbox").val(" ");
        $("#container").scrollTop($("#container").prop("scrollHeight"));
    }); 
  
  
  //the drag and drop function!!!!
  
        var stack = $("#container").html();
        $(".boxed").draggable({helper: "clone"});
        $(".textbox").droppable({
            accept:".boxed",
            drop: function (ev, ui) { 
                var droppedItem = $(ui.draggable).clone();
                var currentDraggedValue = droppedItem.text();
                $(this).html(currentDraggedValue);
            }
        });
  });

