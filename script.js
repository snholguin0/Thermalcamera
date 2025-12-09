// Live stream URL from your Pi via ngrok
const STREAM_URL =
  "https://subpleural-malissa-wagglingly.ngrok-free.dev/live";

const img = document.getElementById("thermal-stream");
const modeLabel = document.getElementById("mode-label");
const modeButtons = document.querySelectorAll(".mode-btn");

// Simple poll with cache-busting param so the browser refreshes the image
function refreshStream() {
  const url = STREAM_URL + "?t=" + Date.now();
  img.src = url;
}

setInterval(refreshStream, 500);
refreshStream();

const modeNames = {
  0: "Mode 0: Simple thermal view",
  1: "Mode 1: Heat pen drawing",
  2: "Mode 2: Laser grid zones",
};

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.getAttribute("data-mode");
    modeLabel.textContent = modeNames[mode];

    modeButtons.forEach((b) => b.classList.remove("mode-btn-active"));
    btn.classList.add("mode-btn-active");
  });
});
