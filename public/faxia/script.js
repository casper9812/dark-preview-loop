const A = "/__l5e/assets-v1";

const data = [
  {
    place: "Fisioterapia",
    title: "TERAPIA",
    title2: "MANUAL",
    description:
      "Evaluamos el origen real del dolor y tratamos con técnicas manuales precisas para devolverte movilidad sin molestias.",
    image: A + "/de39d819-a1ca-4cd8-aa72-eec3bf866947/WhatsApp_Image_2026-08-26_at_21.37.34_1.jpeg",
  },
  {
    place: "Rehabilitación",
    title: "FUERZA",
    title2: "GUIADA",
    description:
      "Programas de carga progresiva supervisados paso a paso para que la lesión no vuelva cuando regreses a tu deporte.",
    image: A + "/2baec07c-e26c-43eb-87f9-1011972ba6e2/WhatsApp_Image_2026-08-26_at_21.37.34.jpeg",
  },
  {
    place: "Lesiones agudas",
    title: "TOBILLO",
    title2: "Y RODILLA",
    description:
      "Control del dolor y la inflamación desde la primera sesión, con crioterapia y movilización temprana bien dosificada.",
    image: A + "/bb3d7d13-e7b7-4c9f-a492-bb9601012e01/WhatsApp_Image_2026-08-26_at_21.37.35.jpeg",
  },
  {
    place: "Movilidad",
    title: "MOVILIDAD",
    title2: "ARTICULAR",
    description:
      "Sesiones de movilidad y control motor para recuperar rangos perdidos y moverte con libertad todos los días.",
    image: A + "/f13dbce5-75fc-49e6-989e-3654c4afbd2b/WhatsApp_Image_2026-08-26_at_21.38.23.jpeg",
  },
  {
    place: "Entrenamiento",
    title: "READAPTA-",
    title2: "CIÓN",
    description:
      "Trabajo con bandas y ejercicio terapéutico para reeducar el gesto deportivo y volver a competir con confianza.",
    image: A + "/5a9b5b47-647b-421d-a709-bd6bc36ed0ae/WhatsApp_Image_2026-08-19_at_16.05.32.jpeg",
  },
  {
    place: "Masoterapia",
    title: "MASAJE",
    title2: "PROFUNDO",
    description:
      "Liberación miofascial y descarga muscular para el estrés, las contracturas y el dolor de cuello y espalda.",
    image: A + "/90f424a0-b024-4f33-9bb4-df42971b6d2a/WhatsApp_Image_2026-08-19_at_16.05.33.jpeg",
  },
];

let order = data.map((_, i) => i);
let detailsEven = true;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let contentOffset = 100;
const ease = "sine.inOut";
let queued = 0;
let transitioning = false;
let pendingRelayout = false;
let resizeTimer;
let loopTween = null;
let autoplay = true;

const getCard = (index) => `#card${index}`;
const getCardContent = (index) => `#card-content-${index}`;

const _ = (id) => document.getElementById(id);

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function loadImages() {
  return Promise.all(data.map(({ image }) => loadImage(image)));
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    loopTween = gsap.to(target, { ...properties, duration, onComplete: resolve });
  });
}

function markActiveCard() {
  data.forEach((_, i) => {
    const el = document.querySelector(getCard(i));
    if (el) el.classList.toggle("is-active", i === order[0]);
  });
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("is-current", i === order[0]);
  });
}

function buildDots() {
  _("dots").innerHTML = data
    .map((d, i) => `<button class="dot" type="button" aria-label="Ver ${d.place}" data-index="${i}"></button>`)
    .join("");
  _("dots").querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.dataset.index)));
  });
}

function goTo(index) {
  const current = order.indexOf(index);
  if (current <= 0) return;
  autoplay = false;
  restartIndicator();
  queued += current;
  if (!transitioning) step();
}

function next() {
  goTo(order[1]);
}

function prev() {
  goTo(order[order.length - 1]);
}

function restartIndicator() {
  if (loopTween) loopTween.kill();
  gsap.set(".indicator", { x: -window.innerWidth });
}

function computeLayout() {
  const { innerWidth: width, innerHeight: height } = window;
  const n = data.length - 1;
  const compact = width < 900;
  gap = compact ? 8 : 20;
  const padRight = compact ? 14 : 40;
  const padLeft = compact ? 14 : 40;
  const rowMax = width - padLeft - padRight;
  const maxCard = compact ? 92 : 168;
  cardWidth = Math.max(64, Math.min(maxCard, Math.floor((rowMax - (n - 1) * gap) / n)));
  cardHeight = Math.round(cardWidth * 1.35);
  offsetLeft = width - padRight - n * cardWidth - (n - 1) * gap;
  const paginationSpace = compact ? 62 : 84;
  offsetTop = height - cardHeight - paginationSpace;
  contentOffset = Math.round(cardHeight * 0.36);
}

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  computeLayout();

  gsap.set("#pagination", { top: offsetTop + cardHeight + 24, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
  gsap.set(getCard(active), { x: 0, y: 0, width: "100vw", height: "100vh" });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });
  gsap.set(".indicator", { x: -window.innerWidth });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      width: cardWidth,
      y: offsetTop + cardHeight - contentOffset,
    });
  });

  markActiveCard();

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: window.innerWidth + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(loop, 900);
    },
  });

  rest.forEach((i, index) => {
    gsap.to(getCard(i), { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay });
    gsap.to(getCardContent(i), { x: offsetLeft + index * (cardWidth + gap), ease, delay: startDelay });
  });

  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

  window.addEventListener("resize", onResize);
}

function step() {
  return new Promise((resolve) => {
    transitioning = true;
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    markActiveCard();

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease, duration: 1.2 });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.4,
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease,
      duration: 1.2,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });
        gsap.set(getCardContent(prv), {
          width: cardWidth,
          x: xNew,
          y: offsetTop + cardHeight - contentOffset,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });

        transitioning = false;
        if (pendingRelayout) {
          pendingRelayout = false;
          relayout();
        }

        if (queued > 0) queued -= 1;
        if (queued > 0) {
          step();
        } else if (!autoplay) {
          autoplay = true;
          loop();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i === prv) return;
      gsap.set(getCard(i), { zIndex: 30 });
      gsap.to(getCard(i), {
        x: offsetLeft + index * (cardWidth + gap),
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        ease,
        duration: 1,
        delay: 0.1 * (index + 1),
      });
      gsap.to(getCardContent(i), {
        width: cardWidth,
        x: offsetLeft + index * (cardWidth + gap),
        y: offsetTop + cardHeight - contentOffset,
        opacity: 1,
        zIndex: 40,
        ease,
        duration: 1,
        delay: 0.1 * (index + 1),
      });
    });

    gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.9, ease });
    gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.9, ease });
    gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.9, ease });
    gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.35, duration: 0.6, ease });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.45,
      duration: 0.6,
      ease,
      onComplete: resolve,
    });
  });
}

async function loop() {
  if (!autoplay) return;
  await animate(".indicator", 5.5, { x: 0 });
  if (!autoplay) return;
  await animate(".indicator", 1.2, { x: window.innerWidth, delay: 0.6 });
  if (!autoplay) return;
  gsap.set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

function relayout() {
  if (transitioning) {
    pendingRelayout = true;
    return;
  }
  computeLayout();
  const [active, ...rest] = order;

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
    scale: 1,
  });

  rest.forEach((i, index) => {
    const x = offsetLeft + index * (cardWidth + gap);
    gsap.set(getCard(i), { x, y: offsetTop, width: cardWidth, height: cardHeight, borderRadius: 10 });
    gsap.set(getCardContent(i), { x, y: offsetTop + cardHeight - contentOffset, width: cardWidth });
  });

  gsap.set("#pagination", { top: offsetTop + cardHeight + 24, left: offsetLeft });
  gsap.set(".cover", { x: window.innerWidth + 400 });
}

function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(relayout, 150);
}

const cards = data
  .map(
    (i, index) =>
      `<div class="card" id="card${index}" data-index="${index}" role="button" tabindex="0" aria-label="Ver ${i.place}"><div class="card-fill" style="background-image:url(${i.image})"></div><div class="card-img" style="background-image:url(${i.image})"></div></div>`,
  )
  .join("");

const cardContents = data
  .map(
    (i, index) => `<div class="card-content" id="card-content-${index}" data-index="${index}">
      <div class="content-start"></div>
      <div class="content-place">${i.place}</div>
      <div class="content-title-1">${i.title}</div>
      <div class="content-title-2">${i.title2}</div>
    </div>`,
  )
  .join("");

_("demo").innerHTML = cards + cardContents;

buildDots();

document.querySelectorAll("[data-index]").forEach((el) => {
  if (el.classList.contains("dot")) return;
  el.addEventListener("click", () => goTo(Number(el.dataset.index)));
});

document.querySelector(".arrow-right").addEventListener("click", next);
document.querySelector(".arrow-left").addEventListener("click", prev);

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start();
