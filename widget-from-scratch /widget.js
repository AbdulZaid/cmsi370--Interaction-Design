// JD: These declarations do not follow the style that we have adopted
//     in class for declaring functions.  You should adjust this accordingly.
function send_message(message) {
    $("#container").html("<span class = 'bot'>ChatBox: </span>" + message);
}

function username() {
    send_message("Hello, what's your name?");
}

$(function() {
  
  username();
  //Send on "enter" click.
    // JD: Note how your code is bound to IDs (# selectors), thus severely using
    //     the reusability of your work.  Consider switching to repeatable values
    //     like classes.
  $(".textbox").keypress( function(event) {
    if(event.which == 13) { //when enter is hit.
        // JD: Your indentation scheme is showing inconsistency here.  You started
        //     out indenting two spaces at a time, but now you went for 5 spaces.
        //     Choose an indent width and stick with it.
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

  //send when "send button" is clicked.
    // JD: Please compare the function below to the function above.  I think you
    //     will agree with me that when "Send when Enter is clicked" is checked,
    //     then hitting Enter and clicking the Send button should behave in *exactly*
    //     the same way.  So what does that mean?  Well, when exactly the same thing
    //     is supposed to happen, then you should call *exactly the same code*.
    //
    //     This is not what is happening here: instead, you have a near *copy* of the
    //     code that you have above.  This is very dangerous; what if you want to
    //     revise what happens upon Send?  Now you need to modify two copies of code.
    //     Sometimes you might forget, then all of a sudden hitting Enter will not
    //     do the same thing as clicking Send.  Be careful; that's precisely why we
    //     seek proper separation of concerns.
  $("#send").click(function(){
        var userName = "<span class = 'username' = >You: </span>";
        username(); // JD: I rest my case.
        var textValue = $(".textbox").val();
        var currentText = $("#container").html();
        $("#container").html(currentText + "<br>" + userName +textValue);
        $(".textbox").val(" ");
        $("#container").scrollTop($("#container").prop("scrollHeight"));
        }); // JD: Bad indent here.
  
  
  //the drag and drop function!!!!
  $(document).ready(function() { // JD: No need to call document.ready again;
                                 //     the $() call at the top already does it!
        var stack = $("#container").html();
    // JD: On the one hand, it is good that you found jQuery UI to implement
    //     drag-and-drop functionality.  On the other hand, this makes you
    //     miss out on an opportunity to implement this yourself.
    //
    //     Still, I think you have also discovered that even with these helpers,
    //     things don't just work like magic.  As I pointed out in the email I
    //     sent you on December 3, there is a crucial bug in your drop handler
    //     that wipes out the droppable functionality in the text box.
        $(".boxed").draggable({helper: "clone"});
        $(".textbox").droppable({
            accept:".boxed",
            drop: function(ev, ui) { // JD: Space after "function" again.
                // JD: This should be indented by an additional level (see where
                //     this comment starts).
            var droppedItem = $(ui.draggable).clone();
            var currentDraggedValue = droppedItem.text();
            $(this).html(currentDraggedValue);
            
            }
            }); // JD: Meanwhile, these three })'s are indented too far.
        });

  });
// JD: Remember, indentation is not just about being "pretty" (although the code
//     does look visually better).  The purpose of indentation is to *properly
//     represent the structure of your code*.  If you do not indent properly, then
//     (a) you make the structure of your code harder to discern, and (b) you make
//     the reader doubt your own understanding of the structure of teh code.  You
//     don't want either of these to happen.
