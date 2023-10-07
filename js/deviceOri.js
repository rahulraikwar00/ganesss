const heading = document.getElementById("coomps");
let compass;

const isIOS =
  navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
  navigator.userAgent.match(/AppleWebKit/);

function initCompass() {
  if (isIOS) {
    DeviceOrientationEvent.requestPermission()
      .then((res) => {
        if (res === "granted") {
          window.addEventListener("deviceorientationabsolute", handler, true);
        } else {
          alert("Compass disabled");
        }
      })
      .catch((err) => console.log(err));
  } else {
    console.log("add event");
    window.addEventListener("deviceorientation", handler, true);
  }
}

function handler(e) {
  console.log(e);
  compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
  heading.innerText = Math.round(compass) + " deg";
}

initCompass();
