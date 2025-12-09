// script.js

// Base URL for your Pi/ngrok
const PI_BASE = "https://subpleural-malissa-wagglingly.ngrok-free.dev";

// Image stream endpoint
const STREAM_URL = PI_BASE + "/live";

const img = document.getElementById("thermal-stream");
const modeLabel = document.getElementById("stream-overlay-text");
const modeButtons = document.querySelectorAll(".mode-btn");

// Hidden image used to hit /setmode without CORS issues
const controlImg = new Image();

// Poll the live frame from the Pi
function refreshStream() {
  const url = STREAM_URL + "?t=" + Date.now();
  img.src = url;
}
setInterval(refreshStream, 400);
refreshStream();

const modeNames = {
  0: "Mode 0 · Simple thermal view",
  1: "Mode 1 · Heat pen drawing",
  2: "Mode 2 · Laser grid zones",
};

// Tell the Pi to change mode
function setModeOnPi(mode) {
  controlImg.src = `${PI_BASE}/setmode/${mode}?t=${Date.now()}`;
}

// Wire up buttons
modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = parseInt(btn.getAttribute("data-mode"), 10);

    // Update overlay text
    modeLabel.textContent = modeNames[mode] || "";

    // Button active state
    modeButtons.forEach((b) => b.classList.remove("mode-btn-active"));
    btn.classList.add("mode-btn-active");

    // Send change to Pi
    setModeOnPi(mode);
  });
});

// Start with mode 0 label
modeLabel.textContent = modeNames[0];
