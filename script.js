document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const clearBtn = document.getElementById("clear-btn");
    const directionDiv = document.getElementById("direction");
    let painting = false;
    let stepCount = 0;
    let deviceDirection = 0; // Variable to store device direction in degrees

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function handleDeviceMotion(event) {
        stepCount = event.accelerationIncludingGravity.x > 10 ? stepCount + 1 : stepCount;
        document.getElementById("step-count").innerText = `Step Count: ${stepCount}`;
    }

    function handleDeviceOrientation(event) {
        deviceDirection = event.alpha; // Get device orientation in degrees (0 to 360)
        directionDiv.innerText = `Device Direction: ${deviceDirection.toFixed(2)}°`;
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endPosition);

    clearBtn.addEventListener("click", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stepCount = 0;
        document.getElementById("step-count").innerText = `Step Count: 0`;
        directionDiv.innerText = `Device Direction: 0°`;
    });

    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", handleDeviceMotion, false);
    } else {
        document.getElementById("step-count").innerText = "Step Counter not supported on this device/browser.";
    }

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleDeviceOrientation, false);
    } else {
        directionDiv.innerText = "Device Orientation not supported on this device/browser.";
    }
});
