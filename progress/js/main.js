$(document).ready(function(){
	var prog = 0;
	$(document).on('click', '.next-btn', function(e) {
        e.preventDefault();
        $('.progress-bar').show();
        var intervalId = window.setInterval(function() {
        	if (prog < 98) {
				setTimeout(function() {
					prog +=1;
					$('.bar').addClass('move');
					$('.bar').css('width', prog+'%');
				}, 10);
			}
			else {
				setTimeout(function() {
					prog = 100;
					$('.bar').css('width', prog+'%');
					$('.bar').removeClass('move');
				}, 10);
				clearInterval(intervalId);
			}
		}, 10);
	});
});