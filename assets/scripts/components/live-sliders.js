const liveList = document.querySelector('.js-live__list')
const liveEvents = document.querySelector('.js-live__events-list')
const liveItems = document.querySelectorAll('.js-live__item')
const liveEventsItems = document.querySelectorAll('.js-live__item')

export let swiperNews
export let swiperEvents

if (liveList && liveEvents) liveSlidersInit()

function liveSlidersInit () {
  swiperNews = new Swiper(liveList, {
    speed: 400,
    slidesPerView: 'auto',
    centeredSlides: liveItems.length === 1,
    breakpoints: {
      1280: {
        slidesPerView: 3
      }
    }
  })
  swiperEvents = new Swiper(liveEvents, {
    speed: 400,
    slidesPerView: 'auto',
    centeredSlides: liveEventsItems.length === 1,
    spaceBetween: 24,
    breakpoints: {
      1280: {
        slidesPerView: 3
      }
    }
  })
}
