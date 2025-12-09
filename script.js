// Base URLs
const BASE_URL = "https://subpleural-malissa-wagglingly.ngrok-free.dev";
const STREAM_URL = `${BASE_URL}/live`;

const img = document.getElementById("thermal-stream");
const modeLabel = document.getElementById("mode-label");
const modeButtons = document.querySelectorAll(".mode-btn");

const modeNames = {
  0: "Mode 0: Simple thermal view",
  1: "Mode 1: Heat pen drawing",
  2: "Mode 2: Laser grid zones",
};

// Poll /live for a fresh frame every 500 ms
function refreshStream() {
  const url = STREAM_URL + "?t=" + Date.now(); // cache-buster
  img.src = url;
}

setInterval(refreshStream, 500);
refreshStream();

// Tell the Pi to change mode
function sendModeToPi(mode) {
  fetch(`${BASE_URL}/setmode/${mode}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Mode set:", data);
    })
    .catch((err) => {
      console.error("Mode change failed:", err);
    });
}

// Hook up mode buttons
modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modeStr = btn.getAttribute("data-mode");
    const mode = parseInt(modeStr, 10);

    // Update label on page
    modeLabel.textContent = modeNames[mode];

    // Toggle active button style
    modeButtons.forEach((b) => b.classList.remove("mode-btn-active"));
    btn.classList.add("mode-btn-active");

    // Send mode change to Pi
    sendModeToPi(mode);
  });
});
