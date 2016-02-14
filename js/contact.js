if (typeof jQuery === 'undefined') {
  loadjQuery('//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', verifyJQueryCdnLoaded);
} else {
  main();
}

function verifyJQueryCdnLoaded() {
  if (typeof jQuery === 'undefined')
    loadjQuery('script/jquery-1.6.1.js', main);
  else
    main();
}

function loadjQuery(url, callback) {
  var script_tag = document.createElement('script');
  script_tag.setAttribute('src', url)
  script_tag.onload = callback; // Run callback once jQuery has loaded
  script_tag.onreadystatechange = function () { // Same thing but for IE
    if (this.readyState == 'complete' || this.readyState == 'loaded') callback();
  }
  script_tag.onerror = function() {
    loadjQuery('script/jquery-1.6.1.js', main);
  }
  document.getElementsByTagName('head')[0].appendChild(script_tag);
}

function main() {
  if (typeof jQuery === 'undefined')
    alert('jQuery not loaded.');

	$(document).ready(function(){
			$('#contact-form')
				.append('<fieldset><label for="name">Name <sup class="star">&#10033;</sup></label>')
                .append('<input type="text" name="name" id="name" size="40" class="form-control form-group" type="text"></fieldset>')
                .append('<fieldset><label for="email">Email <sup class="star">&#10033;</sup></label>')
                .append('<input type="text" name="email" id="email" size="40" class="form-control form-group" type="email"></fieldset>')
                .append('<fieldset><label for="message">Message <sup class="star">&#10033;</sup></label>')
                .append('<textarea type="text" name="message" id="message" cols="40" rows="10" class="form-control form-group"></textarea></fieldset>')
                .append('<input type="submit" value="Send Message" id="submit" class="btn btn-primary form-group submit">')
                .append('<div class="response-output display-none"></div>')
                .append('<div id="ezcontac-ac"><div id="ezcontac-alertBox" class="hide"></div></div>');

            if ($('link[href*="ezcontac.css"]').length) {
    			//user wants to use their own custom styles
			} else {
				// let's load our own stylesheet
	            $('<link/>', {
				   rel: 'stylesheet',
				   type: 'text/css',
				   href: 'http://git.ejank.com/css/ezcontac.css'
				}).appendTo('head');
	        }

	        var contentType ='application/x-www-form-urlencoded; charset=utf-8';
	 
	        if(window.XDomainRequest) //for IE8,IE9
	            contentType = 'text/plain';
		
		$('#submit').click(function() {

			$('.waiting').show(0);
			$('#ezcontac-alertBox').removeClass('show success').addClass('hide');
			
			$.ajax({
				type : 'POST',
				url : 'http://git.ejank.com/',
				dataType : 'json',
				data: {
					apikey: ezcontacid,
					name: $('#name').val(),
					email: $('#email').val(),
					message: $('#message').val()
				},
	                        contentType: contentType,
				success : function(data){
					$('.waiting').hide(500);
					$('#ezcontac-alertBox').removeClass('hide').addClass((data.error === true) ? 'error' : 'success')
						.text(data.msg).show(500);
					if (data.error === true) {
						if (data.eh === 'email') {
							$('#email').addClass('error animated shake');
							scroller('#email');
							$('#email').focus();
						}else {
							$('#email').removeClass('error animated shake');
						}
						if (data.eh === 'name') {
							$('#name').addClass('error animated shake');
							scroller('#name');
							$('#name').focus();
						}else {
							$('#name').removeClass('error animated shake');
						}
						if (data.eh === 'message') {
							$('#message').addClass('error animated shake');
							scroller('#message');
							$('#message').focus();
						}else {
							$('#message').removeClass('error animated shake');
						}
						if (data.spamcheck === true) {
							$('#spamCheck').show(500);
						}else {
							$('#spamCheck').hide(0);
						}
					}
					else if (data.error === false) {
						$('#name').removeClass('error animated shake');
						$('#email').removeClass('error animated shake');
						$('#message').removeClass('error animated shake');
						$('#contact-form :input').not(':submit').val('')
						$('#content').removeClass('emailLayoutbox').addClass('layoutbox');
						$('#welcome').show(100);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$('.waiting').hide(500);
					$('#ezcontac-alertBox').removeClass('hide').addClass('error show')
						.text('There was an error.'+errorThrown);
				}
			});
			var timeout;
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				$('#ezcontac-alertBox').removeClass('show').addClass('hide');
	    	}, 2000);

			return false;
		});
		
		function scroller(position) {
	        var lastElementTop = $(position).position().top;
	        var scrollAmount = lastElementTop - 150;
	        $('html,body').animate({scrollTop: scrollAmount},1000);
	    }
	});
}