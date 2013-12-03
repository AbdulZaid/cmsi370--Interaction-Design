$(function() {

  $("#submit").click(function(){
        var textValue = $("#textbox").val();
        $("#display").html(textValue);
        $("#textbox").val(" ");
    });
  });