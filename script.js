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
  "assets/fotos/fotominha.jpeg",
  "assets/fotos/foto2.jpeg",
  "assets/fotos/foto3.jpeg",
  "assets/fotos/foto4.jpeg",
  "assets/fotos/foto5.jpeg",
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

let transitioning = false;

function nextScreen() {
  if (transitioning || currentIndex >= screens.length - 1) return;
  transitioning = true;
  const current = screens[currentIndex];
  const next = screens[currentIndex + 1];

  current.classList.add("screen-leaving");
  setTimeout(() => {
    current.classList.remove("active", "screen-leaving");
    next.classList.add("active", "screen-entering");
    currentIndex++;
    updateDots();
    updateParticlesForScreen(next);
    if (next.id === "screen-gallery") iniciarGaleriaSeNecessario();
    setTimeout(() => {
      next.classList.remove("screen-entering");
      transitioning = false;
    }, 520);
  }, 420);
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
  const hintCard = document.getElementById("hint-card");
  const hintText = document.getElementById("hint-text");
  if (normalizar(input.value) === normalizar(SENHA_CORRETA)) {
    feedback.textContent = "";
    hintCard.classList.remove("visible");
    nextScreen();
  } else {
    tentativasErradas++;
    feedback.textContent = "não foi essa, tenta de novo :)";
    if (tentativasErradas >= 1) {
      hintText.textContent = DICA_SENHA;
      hintCard.classList.add("visible");
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
  if (transitioning) return;
  if (msgIndex < MENSAGENS.length - 1) {
    transitioning = true;
    msgTextEl.classList.add("msg-leaving");
    setTimeout(() => {
      msgIndex++;
      renderMessage();
      msgTextEl.classList.remove("msg-leaving");
      msgTextEl.classList.add("msg-entering");
      setTimeout(() => {
        msgTextEl.classList.remove("msg-entering");
        transitioning = false;
      }, 550);
    }, 420);
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
   TELA 5 — GALERIA DE FOTOS (slide direcional)
   Cada foto entra deslizando de um lado aleatório, fica
   parada por um tempo, e sai enquanto a próxima entra.
   ============================================================ */
const galleryStage = document.getElementById("gallery-stage");
const galleryNextBtn = document.getElementById("gallery-next-btn");
const DIRECOES_GALERIA = ["top", "bottom", "left", "right"];
const TEMPO_PAUSA_FOTO = 2600;   // quanto tempo cada foto fica parada (ms)
const DURACAO_TRANSICAO_FOTO = 800; // duração da entrada/saída (ms)
const TEMPO_POR_FOTO = TEMPO_PAUSA_FOTO + DURACAO_TRANSICAO_FOTO;
const SEM_MOVIMENTO = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!galleryNextBtn) {
  console.error('Elemento com id="gallery-next-btn" não encontrado no HTML. Confira se o index.html foi substituído pela versão mais recente.');
}

let galleryIndex = 0;
const fotosJaExibidas = new Set(); // guarda quais posições do array FOTOS já apareceram

// Função dedicada: só libera o botão "continuar" quando TODAS as
// posições de FOTOS já tiverem passado pela tela pelo menos 1 vez.
function liberarBotaoSeTodasForamVistas(indiceFotoExibida) {
  fotosJaExibidas.add(indiceFotoExibida);
  if (fotosJaExibidas.size >= FOTOS.length && galleryNextBtn) {
    galleryNextBtn.classList.remove("gallery-next-hidden");
  }
}

function offsetDirecao(dir) {
  const mapa = {
    top: "translateY(-120%)",
    bottom: "translateY(120%)",
    left: "translateX(-120%)",
    right: "translateX(120%)"
  };
  return mapa[dir];
}

function sortearDirecao(excluir) {
  const opcoes = DIRECOES_GALERIA.filter(d => d !== excluir);
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}

function mostrarProximaFoto() {
  const fotoAtual = galleryStage.querySelector("img");
  const dirEntrada = sortearDirecao();
  const indiceAtual = galleryIndex % FOTOS.length;
  const src = FOTOS[indiceAtual];
  galleryIndex++;

  // Marca essa posição como "já vista" — quando todas tiverem
  // sido marcadas, a função libera o botão sozinha.
  liberarBotaoSeTodasForamVistas(indiceAtual);

  const novaFoto = document.createElement("img");
  novaFoto.src = src;
  novaFoto.alt = "Foto do casal";

  if (SEM_MOVIMENTO) {
    galleryStage.innerHTML = "";
    galleryStage.appendChild(novaFoto);
  } else {
    novaFoto.style.transition = `transform ${DURACAO_TRANSICAO_FOTO}ms ease, opacity ${DURACAO_TRANSICAO_FOTO}ms ease`;
    novaFoto.style.transform = offsetDirecao(dirEntrada);
    novaFoto.style.opacity = "0";
    galleryStage.appendChild(novaFoto);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        novaFoto.style.transform = "translate(0, 0)";
        novaFoto.style.opacity = "1";
      });
    });

    if (fotoAtual) {
      const dirSaida = sortearDirecao(dirEntrada);
      setTimeout(() => {
        fotoAtual.style.transform = offsetDirecao(dirSaida);
        fotoAtual.style.opacity = "0";
        setTimeout(() => fotoAtual.remove(), DURACAO_TRANSICAO_FOTO);
      }, 50);
    }
  }

  setTimeout(mostrarProximaFoto, TEMPO_POR_FOTO);
}

let galleryIniciada = false;

function iniciarGaleriaSeNecessario() {
  if (galleryIniciada) return; // evita reiniciar se ela passar pela tela de novo
  galleryIniciada = true;

  if (FOTOS.length === 0) {
    galleryStage.innerHTML = `<p class="gallery-empty">Coloque as fotos em assets/fotos/ e liste os nomes no array FOTOS, lá no início do script.js.</p>`;
    if (galleryNextBtn) galleryNextBtn.classList.remove("gallery-next-hidden");
  } else {
    mostrarProximaFoto();
  }
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
   PARTÍCULAS — corações flutuantes
   Configurável por tela via atributo data-particles="hearts"
   no HTML de cada <section class="screen"> (deixe vazio pra
   desativar numa tela específica).
   ============================================================ */
const HEART_SVG = `<svg viewBox="0 0 32 29" width="22" height="20"><path fill="#f2668a" d="M16 29S0 18.5 0 8.7C0 3.9 3.9 0 8.7 0c3 0 5.7 1.5 7.3 3.9C17.6 1.5 20.3 0 23.3 0 28.1 0 32 3.9 32 8.7 32 18.5 16 29 16 29z"/></svg>`;

const particleLayer = document.getElementById("particle-layer");
let activeTypes = { hearts: false };
let spawnTimer = null;

function updateParticlesForScreen(screenEl) {
  const cfg = (screenEl.dataset.particles || "").split(",").map(s => s.trim());
  activeTypes.hearts = cfg.includes("hearts");
}

function spawnParticle() {
  if (!activeTypes.hearts) return;

  const el = document.createElement("div");
  el.className = "particle heart";
  el.innerHTML = HEART_SVG;

  const size = 0.7 + Math.random() * 0.9;
  const left = Math.random() * 100;
  const duration = 16 + Math.random() * 10; // flutuação lenta
  const drift = (Math.random() * 80 - 40) + "px";

  el.style.left = left + "vw";
  el.style.bottom = "-40px";
  el.style.transform = `scale(${size})`;
  el.style.setProperty("--drift", drift);
  el.style.animationDuration = duration + "s";
  el.style.animationTimingFunction = "ease-in-out";
  el.style.animationFillMode = "forwards";

  particleLayer.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

spawnTimer = setInterval(spawnParticle, 900);

/* ============================================================
   INÍCIO
   ============================================================ */
showScreen(0);
document.getElementById("gate-input").focus();