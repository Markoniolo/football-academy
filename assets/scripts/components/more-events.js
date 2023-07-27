const moreEventsList = document.querySelector('.js-more-events__list')

if (moreEventsList) moreEventsListInit()

function moreEventsListInit () {
  const swiper = new Swiper(moreEventsList, {
    speed: 400,
    spaceBetween: 25,
    slidesPerView: 'auto'
  });
}
