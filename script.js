

// Base URL for the Pi/ngrok
const PI_BASE = "http://10.104.14.26:6080/vnc.html";

const STREAM_URL = PI_BASE + "/live";

const img = document.getElementById("thermal-stream");
const modeLabel = document.getElementById("stream-overlay-text");
const modeButtons = document.querySelectorAll(".mode-btn");

const controlImg = new Image();

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

function setModeOnPi(mode) {
  controlImg.src = `${PI_BASE}/setmode/${mode}?t=${Date.now()}`;
}

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = parseInt(btn.getAttribute("data-mode"), 10);

    modeLabel.textContent = modeNames[mode] || "";

    modeButtons.forEach((b) => b.classList.remove("mode-btn-active"));
    btn.classList.add("mode-btn-active");

    setModeOnPi(mode);
  });
});

modeLabel.textContent = modeNames[0];
