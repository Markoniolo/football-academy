const proSlider = document.querySelector('.js-pro-advantages__slider')

if (proSlider) proSliderInit()

function proSliderInit () {
  const swiper = new Swiper(proSlider, {
    speed: 400,
    slidesPerView: 'auto',
  });
}
