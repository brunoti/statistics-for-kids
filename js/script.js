$(document).ready(function() {

	$('#calculate').click(function() {
		var numbers = $('#numbers').val().split(',');
		for (var i = 0; i <= numbers.length - 1; i++) {
			$('<p>'+ numbers[i] +'</p>').appendTo(this);
		};
		
	})

});
