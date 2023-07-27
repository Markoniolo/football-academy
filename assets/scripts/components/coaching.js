const coachingSlider = document.querySelector('.js-coaching__slider')
let swiper
let oldWidth = document.body.clientWidth

if (coachingSlider) coachingSliderInit()

function coachingSliderInit () {
  window.addEventListener('resize', updateSlider)
  initSwiper()
}

function initSwiper () {
  swiper = new Swiper(coachingSlider, {
    speed: 400,
    spaceBetween: 25,
    loop: true,
    autoHeight: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.coaching__slider-nav_next',
      prevEl: '.coaching__slider-nav_prev',
    },
    breakpoints: {
      1280: {
        autoHeight: false
      }
    }
  });
}

function updateSlider () {
  var newWidth = document.body.clientWidth;
  if(oldWidth !== newWidth){
    oldWidth = document.body.clientWidth;
    swiper.destroy()
    initSwiper()
  }
}
