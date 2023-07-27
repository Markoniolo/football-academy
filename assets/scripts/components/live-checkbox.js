import { swiperNews, swiperEvents } from './live-sliders'

const checkboxItems = document.querySelectorAll('.js-live__checkbox-item')
const liveBlocks = document.querySelectorAll('.js-live__block')
const highlight = document.querySelector('.js-live__checkbox-highlight')
const liveText = document.querySelector('.js-live__text')
const eventTextArray = document.querySelectorAll('.js-live__events-item')
const newsTextArray = document.querySelectorAll('.js-live__item-text')
const newsArray = document.querySelectorAll('.js-live__item')
const eventsArray = document.querySelectorAll('.js-live__events-item')
const imageNews = document.querySelectorAll('.js-live__image_news')
const imageEvents = document.querySelectorAll('.js-live__image_events')
let newsIndex = 0
let eventsIndex = 0
let timerNews
let timerEvents
let sliderActive = newsArray.length > 0 && eventsArray.length > 0

if (checkboxItems.length) checkboxItemsInit()

function checkboxItemsInit () {
  for (let i = 0; i < checkboxItems.length; i++) {
    checkboxItems[i].addEventListener('click', toggleBlock)
  }
  if (sliderActive) {
    for (let i = 0; i < newsArray.length; i++) {
      const index = +newsArray[i].getAttribute('data-index')
      newsArray[i].addEventListener('mouseover', () => choseItem(index, newsArray, 'live__item_hover', newsArray[i]))
    }
    for (let i = 0; i < eventsArray.length; i++) {
      const index = +eventsArray[i].getAttribute('data-index')
      eventsArray[i].addEventListener('mouseover', () => choseItem(index, eventsArray, 'live__events-item_hover', eventsArray[i]))
    }
    timerNews = setInterval(nextNews,10000)
  }
}

function choseItem (index, itemsArray, className, item) {
  if (item.classList.contains(className)) return
  if (className === 'live__item_hover') {
    clearInterval(timerNews)
    timerNews = setInterval(nextNews,10000)
    newsIndex = index
  } else {
    clearInterval(timerEvents)
    timerEvents = setInterval(nextEvent,10000)
    eventsIndex = index
  }
  checkoutItem(index, itemsArray, className)
}

function checkoutItem (index, itemsArray, className) {
  const oldActiveItem = document.getElementsByClassName(className)[0]
  if (oldActiveItem) oldActiveItem.classList.remove(className)
  itemsArray[index].classList.add(className)
  className === 'live__item_hover' ? checkoutImage(index, imageNews) : checkoutImage(index, imageEvents)
  className === 'live__item_hover' ? swiperNews.slideTo(index) : swiperEvents.slideTo(index)
  className === 'live__item_hover' ? liveText.innerHTML = newsTextArray[index].innerHTML : false
}

function checkoutImage (index, array) {
  const oldActiveImage = document.getElementsByClassName('live__image_active')[0]
  if (oldActiveImage) oldActiveImage.classList.remove('live__image_active')
  array[index].classList.add('live__image_active')
}

function nextNews () {
  if (newsIndex < newsArray.length - 1) {
    newsIndex++
  } else {
    newsIndex = 0
  }
  checkoutItem(newsIndex, newsArray, 'live__item_hover')
}

function nextEvent () {
  if (eventsIndex < eventsArray.length - 1) {
    eventsIndex++
  } else {
    eventsIndex = 0
  }
  checkoutItem(eventsIndex, eventsArray, 'live__events-item_hover')
}

function toggleBlock () {
  const index = this.getAttribute('data-index')
  const oldActive = document.querySelector('.live__block_active')
  const oldActiveCheckbox = document.querySelector('.live__checkbox-item_active')
  oldActiveCheckbox.classList.remove('live__checkbox-item_active')
  oldActive.classList.remove('live__block_active')
  liveBlocks[index].classList.add('live__block_active')
  this.classList.add('live__checkbox-item_active')
  updateHighlight(this)
  if (sliderActive) {
    if (+index === 0) {
      clearInterval(timerEvents)
      timerNews = setInterval(nextNews,10000)
      newsIndex = 0
      checkoutItem(newsIndex, newsArray, 'live__item_hover')
    } else {
      clearInterval(timerNews)
      timerEvents = setInterval(nextEvent,10000)
      eventsIndex = 0
      checkoutItem(eventsIndex, eventsArray, 'live__events-item_hover')
    }
  }
}

export function updateHighlight (item) {
  highlight.style.width = `${item.offsetWidth}px`
  highlight.style.transform = `translateX(${item.offsetLeft - 4}px)`
}
