$(function(){
  // OPTIONS
  var cardChangeSpeed = 1000;
  var mainSelector = "#mobile-scroll-slides";
  var slideSelector = "#mobile-scroll-slides > div";
  var navbarOffset = 0;

  $(slideSelector).append("<div class='mss-arrow'>VVV</div>").on("click", function(){
    changeSlide($(this).index() + 1);
  });

  var listeningForScroll = true;
  var checkScroll;

  $(document).on("scroll", scrollHandler);


  function scrollHandler(e){
    //console.log("scrollHandler");
    // if someone scrolls using a mouse or scrollbar, update current slide to account for scroll position
    if (listeningForScroll){
      clearTimeout(checkScroll);
      checkScroll = setTimeout(scrollStopped, 200);
    }
  }

  function scrollStopped(){
    // console.log("scrollStopped");
    // find nearest slide and change to it
    var pos = $(window).scrollTop();
    var bestDistance = 1000;
    var closestElement;
    $(slideSelector).each(function(el, i){
      if(Math.abs($(this).offset().top - pos) < bestDistance){
        closestElement = $(this);
        bestDistance = Math.abs($(this).offset().top - pos);
      }
    });
    changeSlide(closestElement.index(), 200);
  }

  function changeSlide(index, speed=cardChangeSpeed) {
    // console.log("changeSlide", index);

    listeningForScroll = false;
    var oldSlide = $(slideSelector + ".mss-active");
    var current = oldSlide.index();
    var next = $(slideSelector).eq(index);
    var jumpto = false;

    if (next.length == 0){
      next = oldSlide.siblings().eq(0);
      jumpto = true;
    }
    oldSlide.removeClass("mss-active");
    next.addClass("mss-active");

    animateSlides(next, jumpto, speed)
  }

  function animateSlides(next, jumpto, speed){
    // snap window to position
    var scrollTo = $(next).offset().top - navbarOffset;
    if (jumpto){
      $("html, body").scrollTop(scrollTo);
      afterScroll();
    } else {
      $("html, body").animate({ scrollTop: scrollTo }, speed, afterScroll);
    }
  }

  function afterScroll(){
    setTimeout(function(){
      //console.log("listening")
      listeningForScroll = true;
    }, cardChangeSpeed);
  }

});
