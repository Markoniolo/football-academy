const contactMap = document.querySelector('#js-contact-map__map')

if (contactMap) setTimeout(contactMapInit, 0)

function contactMapInit () {
  const centerMap = contactMap.getAttribute('data-coords-center')

  loadMap()

  function loadMap () {
    const mapScript = document.createElement('script')

    mapScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
    document.body.appendChild(mapScript)

    mapScript.addEventListener('load', function () {
      ymaps.ready(contactMapInit)
    })
  }

  function contactMapInit () {
    let myMap
    const zoom = window.innerWidth > 950 ? 14 : 15
    myMap = new ymaps.Map('js-contact-map__map', {
      center: JSON.parse(centerMap),
      zoom: zoom,
      controls: []
    })

    createPlacemark()

    function createPlacemark (item) {
      const coords = JSON.parse(centerMap)
      const placemark = new ymaps.Placemark(coords, {

      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'statics/img/contact-map/contact-placemark.svg',
        iconImageSize: window.innerWidth > 1280 ? [100, 100] : [72, 72],
        iconImageOffset: window.innerWidth > 1280 ? [-50, -50] : [-36, -36],
      })
      myMap.geoObjects.add(placemark)
    }
  }
}
