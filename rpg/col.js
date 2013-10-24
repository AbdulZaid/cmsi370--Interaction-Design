
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
					'<p><strong>Skills:</strong> Magic ability to enter the minds of animals, and people</p>'+
					'<p><strong>Source of Power:</strong> Army of wild animals</p>'+
					'<p><strong>Overall Strength:</strong> 8/10</p>'+
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
					'<select multiple="" class="form-control">'+
            			'<option>Bran Stark</option>'+
            			'<option>Tyrion Lannister</option>'+
            			'<option>Stannis Baratheon</option>'+
            			'<option>Jon Snow</option>'+
            			'<option>Daenerys Targaryen</option>'+
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
                   	$characterRow.find("#classOfChar > em  ").text(character.classType);
              	    $characterRow.find("#Gender > em").text(character.gender);	 
              	    $characterRow.find("select multiple> option")
                  		 .attr({ href: "character.html#" + character.id })
                   		 .text(character.name);
              	     $("#character-table").append($characterRow);
				});
			}
		); 
		
			$.getJSON(
			"http://lmu-diabolical.appspot.com/characters",
			function (characters) {
				// Do something with the character list.
				characters.forEach(function (character) {
               	 	var $characterRow = $(characterRowTemplate2); 
              	    $characterRow.find("select> option")
                  		 .attr({ href: "character.html#" + character.id })
                   		 .text(character.name);
              	     $("#character-table").append($characterRow);
				});
			}
		); 

