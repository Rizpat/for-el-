// Kode ini untuk pengalaman personal, bukan keamanan sungguhan.
const SECRET_CODE = "091023";
let enteredCode = "";
const lockScreen = document.getElementById("lockScreen");
const storyScreen = document.getElementById("storyScreen");
const codeDots = [...document.querySelectorAll(".code-dots span")];
const codeMessage = document.getElementById("codeMessage");

function updateDots() {
  codeDots.forEach((dot, index) => dot.classList.toggle("filled", index < enteredCode.length));
}
function unlockStory() {
  lockScreen.classList.remove("active");
  storyScreen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function enterDigit(digit) {
  if (enteredCode.length >= 6) return;
  enteredCode += digit;
  updateDots();
  if (enteredCode.length === 6) {
    if (enteredCode === SECRET_CODE) {
      codeMessage.textContent = "Kode yang tepat. Ada cerita kecil untukmu…";
      setTimeout(unlockStory, 650);
    } else {
      codeMessage.textContent = "Belum tepat. Coba ingat tanggal yang berarti buat kita.";
      document.querySelector(".code-dots").animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }],
        { duration: 260 }
      );
      setTimeout(() => {
        enteredCode = "";
        updateDots();
      }, 650);
    }
  }
}
document.querySelectorAll("[data-digit]").forEach(button => {
  button.addEventListener("click", () => enterDigit(button.dataset.digit));
});
document.getElementById("deleteDigit").addEventListener("click", () => {
  enteredCode = enteredCode.slice(0, -1);
  codeMessage.textContent = "Welcome to the story we have created.";
  updateDots();
});
document.getElementById("yesButton").addEventListener("click", () => {
  document.getElementById("answerMessage").textContent =
    "Makasih sudah mau membuka kemungkinan itu, beyy, sudah saatnya kita kembali dengan versi terbaik dari masing-masing 🤍";
});
document.addEventListener("keydown", event => {
  if (!lockScreen.classList.contains("active")) return;
  if (/^[0-9]$/.test(event.key)) enterDigit(event.key);
  if (event.key === "Backspace") {
    enteredCode = enteredCode.slice(0, -1);
    updateDots();
  }
});
