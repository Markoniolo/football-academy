const aboutSlider = document.querySelector('.js-other-program')

if (aboutSlider && document.body.clientWidth >= 744) aboutSliderInit()

function aboutSliderInit () {
  const swiper = new Swiper('.js-other-program', {
    speed: 400,
    spaceBetween: 0,
    slidesPerView: 'auto'
  });
}
