const moreNewsList = document.querySelector('.js-more-news__list')

if (moreNewsList) moreNewsListInit()

function moreNewsListInit () {
  const swiper = new Swiper(moreNewsList, {
    speed: 400,
    slidesPerView: 'auto'
  });
}
