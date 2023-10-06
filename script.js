document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let stepCount = 0;
    let deviceDirection = 0;
    let startSelected = false;
    let startX = 0;
    let startY = 0;
  
    function drawDot(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }
  
    function handleDeviceMotion(event) {
      stepCount = event.accelerationIncludingGravity.x > 0 ? stepCount + 1 : stepCount;
      document.getElementById("step-count").innerText = `Step Count: ${stepCount}`;
    }
  
    function handleDeviceOrientation(event) {
      deviceDirection = event.alpha || 0;
      document.getElementById("direction").innerText = `Device Direction: ${deviceDirection.toFixed(2)}°`;
    }
  
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleDeviceMotion, false);
    } else {
      document.getElementById("step-count").innerText = "Step Counter not supported on this device/browser.";
    }
  
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, false);
    } else {
      document.getElementById("direction").innerText = "Device Orientation not supported on this device/browser.";
    }
  
    canvas.addEventListener("mousedown", function(event) {
      if (!startSelected) {
        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
        startSelected = true;
        document.getElementById("start-point").innerText = `Start Point: (${startX.toFixed(2)}, ${startY.toFixed(2)})`;
      } else {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        const radians = (deviceDirection * Math.PI) / 180;
        const newX = x + stepCount * Math.cos(radians) * 10;
        const newY = y + stepCount * Math.sin(radians) * 10;
  
        drawDot(newX, newY);
      }
    });
  });
  
