$(function(){
  // OPTIONS
  var cardChangeSpeed = 1000;
  var slideSelector = "#mobile-scroll-slides > div";
  // if you don't want the top of the slide to be at the
  // very top of the window, for absolute nav bars
  var navbarOffset = 0;
  var arrowHTML = "&darr;"

  // event listeners
  $(slideSelector)
    .append("<div class='mss-arrow'>" + arrowHTML + "</div>")
    .on("click", function(e){
      changeSlide($(this).index() + 1);
    })
    .css("height", window.innerHeight);

  $(document).on("scroll", scrollHandler);

  // global vars
  var listeningForScroll = true;
  var checkScroll;

  function scrollHandler(e){
    //console.log("scrollHandler");
    if (listeningForScroll){
      clearTimeout(checkScroll);
      checkScroll = setTimeout(scrollStopped, 200);
    }
  }

  function scrollStopped(){
    // console.log("scrollStopped");
    // find nearest slide
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
    // make next slide active
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
    // scroll and snap window to position
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
