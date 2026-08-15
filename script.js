const loader = document.querySelector("#loader");
const enterBtn = document.querySelector("#enterBtn");
const music = document.querySelector("#music");
const musicBtn = document.querySelector("#musicBtn");
const video = document.querySelector("#birthdayVideo");
const envelope = document.querySelector("#envelope");
const envelopeHint = document.querySelector("#envelopeHint");
const celebrateBtn = document.querySelector("#celebrateBtn");
const confetti = document.querySelector("#confetti");

let musicPlaying = false;

async function playMusic() {
  try {
    await music.play();
    musicPlaying = true;
    musicBtn.classList.add("playing");
    musicBtn.textContent = "❚❚";
  } catch {
    musicPlaying = false;
    musicBtn.textContent = "♫";
  }
}

enterBtn.addEventListener("click", () => {
  loader.classList.add("hidden");
  document.body.classList.remove("locked");
  playMusic();
  launchConfetti(55);
});

musicBtn.addEventListener("click", () => {
  if (music.paused) playMusic();
  else {
    music.pause();
    musicPlaying = false;
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♫";
  }
});

// Pausa la canción al reproducir el video y la reanuda al terminar.
video.addEventListener("play", () => {
  if (!music.paused) {
    video.dataset.resumeMusic = "true";
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♫";
  }
});
video.addEventListener("ended", () => {
  if (video.dataset.resumeMusic === "true") playMusic();
});

envelope.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  envelope.setAttribute("aria-expanded", String(isOpen));
  envelopeHint.textContent = isOpen ? "Toca para cerrar" : "Toca para abrir";
  if (isOpen) launchConfetti(25);
});

celebrateBtn.addEventListener("click", () => launchConfetti(90));

function launchConfetti(amount) {
  const colors = ["#8d53de", "#efb9d5", "#f5d76e", "#75c9d7", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.animationDuration = 2.7 + Math.random() * 2 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Fondo de estrellas suave.
const canvas = document.querySelector("#stars");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeStars() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  particles = Array.from({ length: Math.min(90, innerWidth / 12) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.7 + 0.3,
    a: Math.random()
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((p) => {
    p.a += 0.012;
    ctx.globalAlpha = 0.25 + Math.abs(Math.sin(p.a)) * 0.7;
    ctx.fillStyle = "#7440b0";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
addEventListener("resize", resizeStars);
resizeStars();
drawStars();
