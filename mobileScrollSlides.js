$(function(){
  //console.log("ready");
  $("#mobile-scroll-slides").children().append("<div class='mss-arrow'>VVV</div>").on("click", function(){
    changeSlide($(this));
  });
});

function changeSlide(oldSlide) {
  //console.log("changeSlide", oldSlide);
  oldSlide.removeClass("mss-active");
  if (oldSlide.next().length){
    oldSlide.next().addClass("mss-active");
  } else {
    oldSlide.siblings().eq(0).addClass("mss-active");
  }
}
