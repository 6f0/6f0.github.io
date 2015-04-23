(function ($) {
  "use strict";
  Pace.on("start", function () {
    $("#preloader").show();
  });
  Pace.on("done", function () {
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website.





    var winWidth = $(window).outerWidth();
    var winHeight = $(window).outerHeight();
// set initial div height / width
    $('.wrapper').css({
      width: winWidth,
      height: winHeight
    });
// make sure div stays full width/height on resize
    $(window).resize(function () {
      var winWidth = $(window).outerWidth();
      var winHeight = $(window).outerHeight();

      $('.wrapper').animate({
        'width': winWidth,
        'height': winHeight
      }, 0);
    });





    $('#worker1').sprite({fps:1, no_of_frames: 2});
    $('#worker2').sprite({fps: 2, no_of_frames: 2});


  

    $('#buildings').plaxify({"xRange": 5});
    $('#clouds').pan({fps: 12, speed: 2, dir: 'left'});


    $.plax.enable();












    $('#baloon .text').hide();

    changeBaloonText($('#baloon .text').first());

    function changeBaloonText(el) {
      el.fadeIn(0.1,function () {
      }).delay(2000).fadeOut(0.1,function () {
        if ($(this).next().length > 0) {
          changeBaloonText($(this).next());
        } else {
          changeBaloonText($(this).prev());
        }
      });

    };


    function getImgSize(el, imgSrc) {
      var newImg = new Image();
      newImg.onload = function () {
        var height = newImg.height;
        var width = newImg.width;

        el.css('height', height);

      };
      newImg.src = imgSrc;
    }

    if ($('.bg-image[data-bg-image]').length > 0) {
      $('.bg-image[data-bg-image]').each(function () {
        var el = $(this);
        var sz = getImgSize(el, el.attr("data-bg-image"));
        el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-bg-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');
      });
    }



    $('[data-placeholder]').focus(function () {
      var input = $(this);
      if (input.val() === input.attr('data-placeholder')) {
        input.val('');

      }
    }).blur(function () {
      var input = $(this);
      if (input.val() === '' || input.val() === input.attr('data-placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('data-placeholder'));
      }
    }).blur();

    $('[data-placeholder]').parents('form').submit(function () {
      $(this).find('[data-placeholder]').each(function () {
        var input = $(this);
        if (input.val() === input.attr('data-placeholder')) {
          input.val('');
        }
      });
    });





  });






})(jQuery);

