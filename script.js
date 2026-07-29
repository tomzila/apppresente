/* ============================================================
   CONFIGURAÇÕES — edite aqui pra ajustar o site sem mexer no resto
   ============================================================ */

// Senha (resposta do enigma). Comparação ignora maiúsculas/acentos.
const SENHA_CORRETA = "victoria";

// Dica exibida se ela errar a resposta (edite à vontade).
const DICA_SENHA = "dica: é o nome dela ;)";

// Mensagens progressivas — adicione, remova ou reordene à vontade.
const MENSAGENS = [
  "Cada dia ao seu lado é um presente que eu não sabia que merecia.",
  "Você trouxe leveza pra minha vida de um jeito que eu nem sabia que precisava.",
  "Quando eu penso no nosso futuro, a única certeza é que quero você nele.",
  "Obrigado por ser exatamente quem você é, comigo e com o mundo.",
  "Feliz aniversário, Victória. Que esse novo ano seja tão bonito quanto você."
];

// Início do namoro (usado no contador de tempo).
const INICIO_NAMORO = new Date(2026, 0, 11, 11, 0, 0); // 11/01/2026 às 11:00

// Fotos da galeria — coloque os arquivos em assets/fotos/ e liste os nomes aqui.
const FOTOS = [
  // "assets/fotos/foto1.jpg",
  // "assets/fotos/foto2.jpg",
];

/* ============================================================
   NAVEGAÇÃO ENTRE TELAS
   ============================================================ */
const screens = Array.from(document.querySelectorAll(".screen"));
let currentIndex = 0;

function showScreen(index) {
  screens.forEach((s, i) => s.classList.toggle("active", i === index));
  currentIndex = index;
  updateDots();
  updateParticlesForScreen(screens[index]);
}

function nextScreen() {
  if (currentIndex < screens.length - 1) showScreen(currentIndex + 1);
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", nextScreen);
});

// Pontos de navegação (visual, não clicáveis pra manter a jornada linear)
const dotsNav = document.getElementById("dots");
screens.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dotsNav.appendChild(dot);
});
function updateDots() {
  dotsNav.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

/* ============================================================
   TELA 1 — ENIGMA / SENHA
   ============================================================ */
function normalizar(txt) {
  return txt
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

let tentativasErradas = 0;

document.getElementById("gate-form").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("gate-input");
  const feedback = document.getElementById("gate-feedback");
  const hint = document.getElementById("gate-hint");
  if (normalizar(input.value) === normalizar(SENHA_CORRETA)) {
    feedback.textContent = "";
    hint.textContent = "";
    nextScreen();
  } else {
    tentativasErradas++;
    feedback.textContent = "não foi essa, tenta de novo :)";
    if (tentativasErradas >= 1) {
      hint.textContent = DICA_SENHA;
    }
    input.focus();
  }
});

/* ============================================================
   TELA 3 — MENSAGENS PROGRESSIVAS
   ============================================================ */
let msgIndex = 0;
const msgTextEl = document.getElementById("message-text");
const msgCounterEl = document.getElementById("msg-counter");
const msgNextBtn = document.getElementById("msg-next");

function renderMessage() {
  msgTextEl.textContent = MENSAGENS[msgIndex];
  msgCounterEl.textContent = `${msgIndex + 1} / ${MENSAGENS.length}`;
  msgNextBtn.textContent = msgIndex === MENSAGENS.length - 1 ? "continuar" : "próxima";
}
renderMessage();

msgNextBtn.addEventListener("click", () => {
  if (msgIndex < MENSAGENS.length - 1) {
    msgIndex++;
    renderMessage();
  } else {
    nextScreen();
  }
});

/* ============================================================
   TELA 4 — CONTADOR DE TEMPO
   ============================================================ */
function atualizarContador() {
  const agora = new Date();
  let diff = Math.max(0, agora - INICIO_NAMORO);

  const dias = Math.floor(diff / 86400000);
  diff -= dias * 86400000;
  const horas = Math.floor(diff / 3600000);
  diff -= horas * 3600000;
  const min = Math.floor(diff / 60000);
  diff -= min * 60000;
  const seg = Math.floor(diff / 1000);

  document.getElementById("c-days").textContent = dias;
  document.getElementById("c-hours").textContent = horas;
  document.getElementById("c-min").textContent = min;
  document.getElementById("c-sec").textContent = seg;
}
setInterval(atualizarContador, 1000);
atualizarContador();

/* ============================================================
   TELA 5 — GALERIA DE FOTOS
   ============================================================ */
const galleryGrid = document.getElementById("gallery-grid");
if (FOTOS.length === 0) {
  galleryGrid.innerHTML = `<p class="gallery-empty">Coloque as fotos em assets/fotos/ e liste os nomes no array FOTOS, lá no início do script.js.</p>`;
} else {
  FOTOS.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Foto do casal";
    galleryGrid.appendChild(img);
  });
}

/* ============================================================
   BOTÃO DE MÚSICA
   ============================================================ */
const musicBtn = document.getElementById("music-toggle");
const music = document.getElementById("bg-music");
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    musicBtn.classList.add("playing");
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});

/* ============================================================
   PARTÍCULAS — corações e folhas flutuantes
   Configurável por tela via atributo data-particles="hearts,leaves"
   no HTML de cada <section class="screen">.
   ============================================================ */
const HEART_SVG = `<svg viewBox="0 0 32 29" width="22" height="20"><path fill="#d98a9c" d="M16 29S0 18.5 0 8.7C0 3.9 3.9 0 8.7 0c3 0 5.7 1.5 7.3 3.9C17.6 1.5 20.3 0 23.3 0 28.1 0 32 3.9 32 8.7 32 18.5 16 29 16 29z"/></svg>`;

const LEAF_SVG = `<svg viewBox="0 0 40 40" width="22" height="22"><path fill="#4a7a55" d="M20 2C10 2 3 12 3 22c0 9 7 16 17 16s17-7 17-16C37 12 30 2 20 2z"/><path stroke="#2f4a34" stroke-width="1.4" fill="none" d="M20 6v30M20 14c-5 0-9 3-11 6M20 20c-5 0-9 3-12 7M20 14c5 0 9 3 11 6M20 20c5 0 9 3 12 7"/></svg>`;

const particleLayer = document.getElementById("particle-layer");
let activeTypes = { hearts: false, leaves: false };
let spawnTimer = null;

function updateParticlesForScreen(screenEl) {
  const cfg = (screenEl.dataset.particles || "").split(",").map(s => s.trim());
  activeTypes.hearts = cfg.includes("hearts");
  activeTypes.leaves = cfg.includes("leaves");
}

function spawnParticle() {
  const types = [];
  if (activeTypes.hearts) types.push("heart");
  if (activeTypes.leaves) types.push("leaf");
  if (types.length === 0) return;

  const type = types[Math.floor(Math.random() * types.length)];
  const el = document.createElement("div");
  el.className = `particle ${type}`;
  el.innerHTML = type === "heart" ? HEART_SVG : LEAF_SVG;

  const size = 0.7 + Math.random() * 0.9;
  const left = Math.random() * 100;
  const duration = 7 + Math.random() * 6;
  const drift = (Math.random() * 80 - 40) + "px";
  const startY = type === "heart" ? "100vh" : "-40px";

  el.style.left = left + "vw";
  el.style.top = type === "heart" ? "auto" : "-40px";
  el.style.bottom = type === "heart" ? "-40px" : "auto";
  el.style.transform = `scale(${size})`;
  el.style.setProperty("--drift", drift);
  el.style.animationDuration = duration + "s";
  el.style.animationTimingFunction = "linear";
  el.style.animationFillMode = "forwards";

  particleLayer.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

spawnTimer = setInterval(spawnParticle, 550);

/* ============================================================
   INÍCIO
   ============================================================ */
showScreen(0);
document.getElementById("gate-input").focus();