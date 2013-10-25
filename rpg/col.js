
$(function() {
	$("#help-button").popover();
});

$(function() {
	$("#help-button1").popover();
});

$(function() {
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
        
            var characterRowTemplate = '<div class="col-sm-6 col-md-3">'+
				'<div class="thumbnail">'+
				  '<img data-src="holder.js/300x200" alt="Character">'+
				  '<div class="caption">'+
					'<h3>Bran Stark</h3>'+
					'<p id = "classOfChar" ><strong>Class: </strong><em></em></p>'+
					'<p id = "Gender"><strong>Gender: </strong><em></em></p>'+
					'<p id = "Level"><strong>Level: </strong><em></em></p>'+
					'<p id = "Money"><strong>Money: </strong><em></em></p>'+
					'<p><button type="button" data-toggle="modal" href="#editModal" class="btn btn-primary">Edit</button>'+
					'<a id= "delete-button" data-toggle="modal" href="#deleteModel" class="btn btn-danger">Delete</a>'+
					'</p>'+
				  '</div>'+
				'</div>'+
			  '</div>'+
			   '</div>';

			  
		    var characterRowTemplate2 ='<div class="col-md-4">'+
					'<p></p>'+
					'<p><strong>Please choose one of the available characters to play.</strong></p>'+
					'<select multiple="" class="form-control id ="selector" ">'+
            			'<option></option>'+
          			'</select>'+
          			'<p></p>'+
          			    '<button id="Select" type="button" class="btn btn-primary">Select</button>'+
         		'</div>'+
			'</div>'+
		'</div>'; 
        
		$.getJSON(
			"http://lmu-diabolical.appspot.com/characters",
			function (characters) {
				// Do something with the character list.
				characters.forEach(function (character) {
               	 	var $characterRow = $(characterRowTemplate);
               	 	$characterRow.find("h3")
                  		 .attr({ href: "character.html#" + character.id })
                   		 .text(character.name);
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
			}
		); 
		
			$.getJSON(
			"http://lmu-diabolical.appspot.com/characters",
			function (charactersList) {
				// Do something with the character list.
               	 var $characterRow1 = $(characterRowTemplate2); 
				charactersList.forEach(function (character) {
             	    $characterRow1.find("option")
                   		 .text(character.name);
              	     $("#character-table").append($characterRow1);
				});
			}
		); 

