    var BoxesTouch = {
        /**
         * Sets up the given jQuery collection as the drawing area(s).
         */
    setDrawingArea: function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
        .addClass("drawing-area")
        
        // Event handler setup must be low-level because jQuery
        // doesn't relay touch-specific event properties.
        .each(function (index, element) {
              element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
              element.addEventListener("touchend", BoxesTouch.endDrag, false);
              element.addEventListener("touchstart", BoxesTouch.startCreate, false);

              })
        
        .find("div.box").each(function (index, element) {
                              element.addEventListener("touchstart", BoxesTouch.startMove, false);
                              element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                              });
    },
        
        /**
         * Tracks a box as it is rubberbanded or moved across the drawing area.
         */
    trackDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
               // Don't bother if we aren't tracking anything.
               if (touch.target.movingBox) {
               // Reposition the object.
               touch.target.movingBox.offset({
                                             left: touch.pageX - touch.target.deltaX,
                                             top: touch.pageY - touch.target.deltaY
                                             });
               
               //Delete Box
               if(!((touch.target.movingBox).hasClass("delete-box")) &&
                  (touch.pageX - touch.target.deltaX > 512 ||
                   touch.pageY - touch.target.deltaY > 512 ||
                   touch.pageX - touch.target.deltaX < 0 ||
                   touch.pageY - touch.target.deltaY < 0))
               {
               (touch.target.movingBox).addClass("delete-box delete-highlight");
               }
               if(((touch.target.movingBox).hasClass("delete-box")) &&
                  (touch.pageX - touch.target.deltaX < 512 &&
                   touch.pageY - touch.target.deltaY < 512 &&
                   touch.pageX - touch.target.deltaX > 0 &&
                   touch.pageY - touch.target.deltaY > 0))
               {
               (touch.target.movingBox).removeClass("delete-box delete-highlight");
               }
               
               }
               });
        
        // Don't do any touch scrolling.
        event.preventDefault();
    },
        
        /**
         * Starts box creation
         */
        
	startCreate: function (event) {
		$.each(event.changedTouches, function (index, touch) {
               touch.target.initialX = touch.pageX;
               touch.target.initialY = touch.pageY;
               
               //Create new box
               var newtemp = '<div class="box" style="width: 0px; height: 0px; left:' + touch.pageX + 'px; top: ' + touch.pageY + 'px">' +
               '</div>';6
               var newbox = newtemp;
               $("#drawing-area").append(newbox);
               (touch.target.creatingbox) = $("div div:last-child");
               (touch.target.creatingbox).addClass("create-highlight");
               $("#drawing-area").find("div.box").each(function (index, element) {
                                                       element.addEventListener("touchstart", BoxesTouch.startMove, false);
                                                       element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                                                       });
               
               });
		//Eat up the event so that the drawing area does not
		//deal with it.
		event.stopPropagation();
	},
        
        /**
         * Concludes a drawing or moving sequence.
         */
    endDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
               if (touch.target.movingBox) {
               // Change state to "not-moving-anything" by clearing out
               // touch.target.movingBox.
               touch.target.movingBox = null;
               }
               
               });
    },
        
        /**
         * Indicates that an element is unhighlighted.
         */
    unhighlight: function () {
        $(this).removeClass("box-highlight");
        
        if ($(this).hasClass("delete-box")) {
            $(this).remove();
        }
        $(this).removeClass("box-highlight");
    },
        
        /**
         * Begins a box move sequence.
         */
    startMove: function (event) {
        $.each(event.changedTouches, function (index, touch) {
               // Highlight the element.
               $(touch.target).addClass("box-highlight");
               
               // Take note of the box's current (global) location.
               var jThis = $(touch.target),
               startOffset = jThis.offset();
               
               // Set the drawing area's state to indicate that it is
               // in the middle of a move.
               touch.target.movingBox = jThis;
               touch.target.deltaX = touch.pageX - startOffset.left;
               touch.target.deltaY = touch.pageY - startOffset.top;
               });
        
        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    }
        
    };