import Inputmask from "inputmask"
const im = new Inputmask("+\\971-999999999")
const popupForms = document.querySelectorAll('.js-popup__form')

if (popupForms.length) popupFormsInit()

function popupFormsInit () {
  for (let i = 0; i < popupForms.length; i++) {
    popupFormInit(popupForms[i])
  }
}

function popupFormInit (form) {
  const phone = form.querySelector('.js-popup__input_phone')
  const email = form.querySelector('.js-popup__input_email')
  const fio = form.querySelector('.js-popup__input_name')
  const popupInputs = form.querySelectorAll('.js-popup__input')
  im.mask(phone);

  phone.addEventListener('input', () => validateForm(form))
  fio.addEventListener('input', () => validateForm(form))
  email.addEventListener('input', () => validateForm(form))
  phone.addEventListener('input', () => validatePhone(form))
  fio.addEventListener('input', () => validateFio(form))
  email.addEventListener('input', () => validateEmail(form))
  for (let i = 0; i < popupInputs.length; i++) {
    popupInputs[i].addEventListener('input', () => validateForm(form))
  }
  form.addEventListener('submit', submitForm)
}

function validatePhone (form) {
  const phone = form.querySelector('.js-popup__input_phone')
  let isValid = true
  let firstMatch = false
  for (let i = 0; i < phone.value.length; i++) {
    if (phone.value[i] === '_') {
      if (firstMatch) isValid = false
      firstMatch = true
    }
  }
  if (!isValid) {
    phone.closest('.popup__label').classList.add('popup__label_error')
  } else {
    phone.closest('.popup__label').classList.remove('popup__label_error')
  }
}

function validateEmail (form) {
  const email = form.querySelector('.js-popup__input_email')
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
    email.closest('.popup__label').classList.add('popup__label_error')
  } else {
    email.closest('.popup__label').classList.remove('popup__label_error')
  }
}

function validateFio (form) {
  const fio = form.querySelector('.js-popup__input_name')
  if (!/^[A-Za-zа-яА-Я\s]*$/.test(fio.value) || !fio.value.trim() || fio.value.includes('  ')) {
    fio.closest('.popup__label').classList.add('popup__label_error')
  } else {
    fio.closest('.popup__label').classList.remove('popup__label_error')
  }
}

export function validateForm (formParameter) {
  let form = formParameter
  if (!form.classList.contains('js-popup__form')) form = formParameter.closest('.js-popup__form')
  const phone = form.querySelector('.js-popup__input_phone')
  const email = form.querySelector('.js-popup__input_email')
  const fio = form.querySelector('.js-popup__input_name')
  const popupInputs = form.querySelectorAll('.js-popup__input')
  const dropdownInputs = form.querySelectorAll('.js-dropdown__input')
  const submitButton = form.querySelector('.js-popup__submit')

  let isValid = true
  if (!/^[A-Za-zа-яА-Я\s]*$/.test(fio.value) || !fio.value.trim() || fio.value.includes('  ')) {
    isValid = false
  }
  let firstMatch = false
  for (let i = 0; i < phone.value.length; i++) {
    if (phone.value[i] === '_') {
      if (firstMatch) isValid = false
      firstMatch = true
    }
  }
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
    isValid = false
  }
  for (let i = 0; i < popupInputs.length; i++) {
    if (!popupInputs[i].value) isValid = false
  }
  for (let i = 0; i < dropdownInputs.length; i++) {
    if (!dropdownInputs[i].value) isValid = false
  }
  submitControl(isValid, submitButton)
}

function submitControl (isValid, submitButton) {
  isValid ? submitButton.disabled = false : submitButton.disabled = true
}

async function submitForm (e) {
  e.preventDefault()
  let form = this
  const submitButton = form.querySelector('.js-popup__submit')
  const url = form.getAttribute('action')
  submitButton.disabled = true
  fetch(url, {
    method: 'post',
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then(thanksForm(form))
    .catch(() => {
      console.log('error')
    })
}

function thanksForm (form) {
  form.closest('.popup').classList.add('popup_thanks')
}
