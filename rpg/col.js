// Big things have small beginnings...
$(function () {

    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });
});

$(function() {
	$("#help-button").popover();
});

$(function() {
	$("#help-button1").popover();
});

$(function() {
	$("#help-button2").popover();
});
