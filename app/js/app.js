(function ($) {
  $('.socialmedia__carousel').owlCarousel({
    loop: true,
    nav: true,
    navText: ['<i class="icon icon--prev"></i>','<i class="icon icon--next"></i>'],
    dots: false,
    margin: 20,
    responsive: {
      0: {
        items: 2,
        nav: false,
        dots: true
      },
      768: {
        items: 3,
        dots: false
      },
      992: {
        items: 4,
        dots: false
      }
    }
  });
}(jQuery));
