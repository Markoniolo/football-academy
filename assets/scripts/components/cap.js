import { updateHighlight } from './live-checkbox'

const hideSectionArray = document.querySelectorAll('.js-hide-section')
const capSlideArray = document.querySelectorAll('.js-cap-slide')
const menuAnchors = document.querySelectorAll('.js-menu__item_anchor')
const cap = document.querySelector('.js-cap')
const menu = document.querySelector('.js-menu')
let touchPos
let isSectionHide = true
let currentSlideIndex = 0
let isSliderLock = false

if (cap) capInit()

function unlockSlider () {
  isSliderLock = false
}

function capInit() {
  for (let i = 0; i < menuAnchors.length; i++) {
    menuAnchors[i].addEventListener('click', () => anchorScroll(menuAnchors[i].href.split('#')[1]))
  }

  const currentUrl = window.location.href
  const id = currentUrl.split("#")[1]
  hideSection()
  window.addEventListener('mousemove', capParallax)
  cap.addEventListener('wheel', capWheel)
  document.body.ontouchstart = function(e){
    touchPos = e.changedTouches[0].clientY;
  }
  document.body.addEventListener('touchend', touchMove)

  if (id) anchorScroll(id)
}

function anchorScroll(id) {
  showSection()
  cap.classList.add('cap_slide-active')
  for (let i = 0; i < capSlideArray.length; i++) {
    capSlideArray[i].classList.add('cap__slide_active')
  }
  window.removeEventListener('mousemove', capParallax)
  currentSlideIndex = capSlideArray.length - 1
  const anchorElem = document.getElementById(id);
  anchorElem.scrollIntoView({behavior: "smooth", alignToTop: true});
}

function touchMove (e) {
  let newTouchPos = e.changedTouches[0].clientY;
  if(newTouchPos < touchPos && isSectionHide) {
    nextSlide()
  }
  if(newTouchPos > touchPos && window.pageYOffset == 0) {
    prevSlide()
    hideSection()
  }
}

function checkScroll (e) {
  if (window.pageYOffset == 0 && e.deltaY < 0) {
    window.removeEventListener('wheel', checkScroll)
    cap.addEventListener('wheel', capWheel)
    hideSection()
    prevSlide()
  }
}

function capParallax (e) {
  if (document.body.clientWidth >= 1280) {
    if (e.clientY > cap.clientHeight / 2) {
      cap.classList.add('cap_parallax-active')
    } else {
      cap.classList.remove('cap_parallax-active')
    }
  }
}

function nextSlide () {
  if (isSliderLock) return
  isSliderLock = true
  if (cap.classList.contains('cap_slide-active')) {
    currentSlideIndex++
    capSlideArray[currentSlideIndex].classList.add('cap__slide_active')
    if (currentSlideIndex === capSlideArray.length - 1) setTimeout(showSection, 1000)
  } else {
    cap.classList.add('cap_slide-active')
    cap.classList.remove('cap_parallax-active')
    capSlideArray[currentSlideIndex].classList.add('cap__slide_active')
  }
  setTimeout(unlockSlider, 1000)
}

function capWheel (e) {
  window.removeEventListener('mousemove', capParallax)
  if (e.deltaY > 0) {
    nextSlide()
  } else {
    prevSlide()
  }
}

function prevSlide () {
  if (isSliderLock) return
  isSliderLock = true
  if (capSlideArray[currentSlideIndex].classList.contains('cap__slide_active')) {
    capSlideArray[currentSlideIndex].classList.remove('cap__slide_active')
    if (currentSlideIndex !== 0) {
      currentSlideIndex--
    } else {
      cap.classList.remove('cap_slide-active')
      window.addEventListener('mousemove', capParallax)
    }
  }
  setTimeout(unlockSlider, 1000)
}

function hideSection () {
  menu.classList.add('menu_fixed')
  isSectionHide = true
  for (let i = 0; i < hideSectionArray.length; i++) {
    hideSectionArray[i].style.display = 'none'
  }
}

function showSection () {
  isSectionHide = false
  menu.classList.remove('menu_fixed')
  cap.removeEventListener('wheel', capWheel)
  window.addEventListener('wheel', checkScroll)
  for (let i = 0; i < hideSectionArray.length; i++) {
    hideSectionArray[i].style.display = 'block'
  }
  const checkboxItem = document.querySelector('.js-live__checkbox-item')
  updateHighlight(checkboxItem)
}
