const menu = document.querySelector('.js-menu')
const menuButton = document.querySelector('.js-menu-button')
const menuList = document.querySelector('.js-menu-list')
const whiteSectionArray = document.querySelectorAll('.js-white-section')

if (menu) menuInit()

function menuInit () {
  menuButton.addEventListener('click', toggleMenu)
  window.addEventListener('scroll', checkMenuColor)
  checkMenuColor()
}

function toggleMenu () {
  if (menuList.classList.contains('menu__list_active')) {
    menuList.classList.remove('menu__list_active')
  } else {
    menuList.classList.add('menu__list_active')
  }
}

function checkMenuColor () {
  const menuTopCoord = window.pageYOffset + menu.getBoundingClientRect().top
  let isWhite = false
  for (let i = 0; i < whiteSectionArray.length; i++) {
    const blackSectionCoordTop = window.pageYOffset + whiteSectionArray[i].getBoundingClientRect().top
    const blackSectionCoordBottom = blackSectionCoordTop + whiteSectionArray[i].scrollHeight
    if (menuTopCoord > blackSectionCoordTop && menuTopCoord < blackSectionCoordBottom) {
      menu.classList.add('menu_black')
      isWhite = true
    }
  }
  if (!isWhite) menu.classList.remove('menu_black')
}

