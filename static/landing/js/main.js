$(document).ready(function(){
    $('.modal').modal();
    // Materialize Initialization Carousel
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        swipeable : false
      });
    autoplay();
    function autoplay() {
      let i=0;
        setInterval(function() {
          let id = $(".carousel-item.active").attr('id');
          if(id == "firstSliderElement"){
              $('.carousel').carousel('next');
              $('#mapWithMarker, #marker, #printerModel, #modelVector, #printout').css({animation:"null"});
                  setTimeout(()=>{
                    $('#mapWithMarker, #marker, #printerModel, #modelVector, #printout').css({animation:""});
                  },10);
            }
            else{
              i+=4;
              if(i == 12){
                $('.carousel').carousel('next');
                i=0;
              }
            }
          }, 4000);
    }
    $('.indicator-item').click(function(){
      $('#mapWithMarker, #marker, #printerModel, #modelVector, #printout').css({animation:"null"});
      setTimeout(()=>{
        $('#mapWithMarker, #marker, #printerModel, #modelVector, #printout').css({animation:""});
      },10)
    })
});