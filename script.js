const rose = document.getElementById('wind-rose')
const heading = document.getElementById('heading')

let compass

const isIOS = (
  navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
  navigator.userAgent.match(/AppleWebKit/)
);

function initCompass() {
  if(isIOS) {
    DeviceOrientationEvent.requestPermission().then(res => {
      if(res === 'granted') {
        window.addEventListener('deviceorientationabsolute', handler, true)
      } else {
        alert('Compass disabled')
      }
    }).catch(err => console.log(err))
  } else {
    console.log('add event')
    window.addEventListener('deviceorientation', handler, true)
  }
}

function handler(e) {
  console.log(e)
  compass = e.webkitCompassHeading || Math.abs(e.alpha - 360)
  rose.style.transform = `translate(-50%,-50%) rotate(${-compass}deg)`
  heading.innerText = Math.round(compass) + ' deg'
}
initCompass()