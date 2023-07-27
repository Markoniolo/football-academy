import { clearDropdown } from './dropdown'

const openButtons = document.querySelectorAll('.js-open-popup')
const popupClose = document.querySelector('.js-popup-close')
const inputHidden = document.querySelector('.js-popup__input-hidden')
const popup = document.querySelector('.js-popup')
const body = document.getElementsByTagName('body')[0]

if (openButtons.length) openButtonsInit()

function popupOpacityActive () {
  popup.classList.add('popup_opacity-active')
  body.classList.add('body_no-scroll')
}

function popupDisplayHide () {
  popup.classList.remove('popup_display-active')
  body.classList.remove('body_no-scroll')
}

function openPopup () {
  const programId = this.getAttribute('data-program-id')
  if (programId) {
    inputHidden.value = programId
    inputHidden.setAttribute('value', programId)
  }
  const gender = this.getAttribute('data-gender')
  if (gender) {
    const labelGender = popup.querySelector('.popup__label_gender')
    const genderItem = labelGender.querySelector('[data-value="' + gender + '"]')
    if (genderItem) genderItem.click()
  }
  const age = this.getAttribute('data-age')
  if (age) {
    const labelAge = popup.querySelector('.popup__label_age')
    const ageItem = labelAge.querySelector('[data-value="' + age + '"]')
    if (ageItem) ageItem.click()
  }

  popup.classList.add('popup_display-active')
  popup.classList.remove('popup_thanks')

  setTimeout(popupOpacityActive,100)
}

function closePopup () {
  inputHidden.value = ''
  const labelGender = popup.querySelector('.popup__label_gender')
  const dropdownGender = labelGender.querySelector('.js-dropdown')
  clearDropdown(dropdownGender)
  const labelAge = popup.querySelector('.popup__label_age')
  const dropdownAge = labelAge.querySelector('.js-dropdown')
  clearDropdown(dropdownAge)
  popup.classList.remove('popup_opacity-active')

  setTimeout(popupDisplayHide,100)
}

function openButtonsInit () {
  for (let i = 0; i < openButtons.length; i++) {
    openButtons[i].addEventListener('click', openPopup)
  }

  popupClose.addEventListener('click', closePopup)
}
