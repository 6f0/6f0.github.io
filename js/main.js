jQuery(document).ready(function($) {
	var value;
	$('.pt a').hover(function() {
		value = $(this).data();
		value = '.'+value['value'];
		$(value).addClass('hover');
	}, function() {
		$(value).removeClass('hover');
	});

	$('.pt a').click(function(e){
		e.preventDefault();
		$('.modal').show();
		$('.modal-background').show();
		$('#title').focus();
	});

	$('.cancel-link').click(function(e){
		e.preventDefault();
		$('.modal').hide();
		$('.modal-background').hide();
	});

	$(document).keyup(function(e){
	    if(e.keyCode === 27 || e.keyCode == 13){
	    	$('.modal').hide();
			$('.modal-background').hide();
	    }
	});
});