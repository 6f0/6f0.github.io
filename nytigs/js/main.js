$( document ).ready(function() {
	// set the sidebar height to content height
	var contentHeight = $('.content').height();
	$('.sidebar').css('height', contentHeight);
	// mobile nav menu
	$('.navbar-btn').click(function() {
		if ( $('.menu').is( ':hidden' ) ) {
			$( '.menu' ).slideDown( 'slow' );
		} else {
			$( '.menu' ).slideUp('slow');
		}
	});
	// window resize event for menu and sidebar
	$( window ).resize(function() {
		var windowWidth = $( window ).width();
		if (windowWidth >= 480) {
			$('.menu').show();
		}
		else {
			$('.menu').hide();
		}

		var contentHeight = $('.content').height();
		if (windowWidth >= 480) {
			$('.sidebar').css('height', contentHeight);
		}
		else {
			$('.sidebar').css('height', 'auto');
		}
	});

});