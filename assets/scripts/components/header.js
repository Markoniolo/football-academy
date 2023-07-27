const header = document.querySelector('.js-header')
const menu = document.querySelector('.js-menu')

if (header) headerInit()

function headerInit () {
  window.addEventListener('scroll', scrollHandler)
}

let scrollPos = 0;
function scrollHandler () {
  let st = window.pageYOffset;
  if (st > scrollPos){
    header.classList.add('header_hide')
    menu.classList.add('menu_hide')
  } else {
    header.classList.remove('header_hide')
    menu.classList.remove('menu_hide')
  }
  scrollPos = st;
}
