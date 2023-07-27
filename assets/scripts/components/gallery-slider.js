const gallerySlider = document.querySelector('.js-gallery__slider')

if (gallerySlider) aboutSliderInit()

function aboutSliderInit () {
  const swiper = new Swiper(gallerySlider, {
    speed: 400,
    spaceBetween: 25,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.gallery__slider-nav_next',
      prevEl: '.gallery__slider-nav_prev',
    },
  });
}
