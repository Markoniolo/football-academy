import { validateForm } from './popup-form'

const dropdownArray = document.querySelectorAll('.js-dropdown')
const dropdownAgeStatic = document.querySelector('[data-age-static]')

if (dropdownArray.length) dropdownArrayInit()
if (dropdownAgeStatic) dropdownAgeStaticInit()

function dropdownAgeStaticInit () {
  const age = dropdownAgeStatic.getAttribute('data-age-static')
  console.log(age)
  if (age) {
    const ageItem = dropdownAgeStatic.querySelector('[data-value="' + age + '"]')
    console.log(ageItem)
    if (ageItem) ageItem.click()
  }
}

function dropdownArrayInit () {
  for (let i = 0; i < dropdownArray.length; i++) {
    dropdownInit(dropdownArray[i])
  }
  window.addEventListener('click', closeAllDropdown)
}

function closeAllDropdown (e) {
  if (e.target.classList.contains('js-dropdown__placeholder')) return
  for (let i = 0; i < dropdownArray.length; i++) {
    dropdownArray[i].classList.remove('dropdown_active')
  }
}

export function clearDropdown (dropdown) {
  const placeholderDefault = dropdown.getAttribute('data-placeholder-default')
  const placeholder = dropdown.querySelector('.js-dropdown__placeholder')
  const input = dropdown.querySelector('.js-dropdown__input')
  placeholder.innerHTML = placeholderDefault
  input.value = ''
}

function dropdownInit (dropdown) {
  const items = dropdown.querySelectorAll('.js-dropdown__item')
  const input = dropdown.querySelector('.js-dropdown__input')
  const placeholder = dropdown.querySelector('.js-dropdown__placeholder')
  const placeholderDefault = placeholder.innerHTML
  dropdown.setAttribute('data-placeholder-default', placeholderDefault)

  placeholder.addEventListener('click', openDropDown)
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', choseItem)
  }

  function choseItem (e) {
    e.preventDefault()
    input.value = this.getAttribute('data-value')
    input.setAttribute('value', this.getAttribute('data-value'))
    validateForm(this)
    placeholder.innerHTML = this.getAttribute('data-name')
    placeholder.classList.add('dropdown__placeholder_active')
    closeDropdown()
  }

  function openDropDown (e) {
    e.preventDefault()
    const currentDropdown = this.closest('.js-dropdown')
    if (currentDropdown.classList.contains('dropdown_active')) {
      dropdown.classList.remove('dropdown_active')
    } else {
      const oldOpenDropdown = document.querySelector('.dropdown_active')
      if (oldOpenDropdown) oldOpenDropdown.classList.remove('dropdown_active')
      dropdown.classList.add('dropdown_active')
    }
  }

  function closeDropdown () {
    dropdown.classList.remove('dropdown_active')
  }
}
