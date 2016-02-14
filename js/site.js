$( document ).ready(function() {
	console.log( 'document ready!' );
	$( '#contact-form' ).addClass('hide');
	$('.contact').on('click', function( e ) {
		e.preventDefault();
		$( '#contact-form' ).removeClass('hide').addClass('slideInDown animated');
		$( '#name' ).focus();
	});
});