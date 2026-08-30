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

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";
let clicks = 0;
let transitioning = false;
let pendingRelayout = false;
let resizeTimer;

const getCard = (index) => `#card${index}`;
const getCardContent = (index) => `#card-content-${index}`;

const _ = (id) => document.getElementById(id);
const set = gsap.set;

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
    gsap.to(target, { ...properties, duration, onComplete: resolve });
  });
}

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", { top: offsetTop + 330, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
  gsap.set("nav", { y: -200, opacity: 0 });
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
      y: offsetTop + cardHeight - 100,
    });
  });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });

  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });

  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

  window.addEventListener("resize", onResize);
  window.addEventListener("load", onResize);
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

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });

      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease,
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
          x: xNew,
          y: offsetTop + cardHeight - 100,
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

        clicks -= 1;
        if (clicks > 0) {
          step();
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
        delay: 0.1 * (index + 1),
      });
      gsap.to(getCardContent(i), {
        x: offsetLeft + index * (cardWidth + gap),
        y: offsetTop + cardHeight - 100,
        opacity: 1,
        zIndex: 40,
        ease,
        delay: 0.1 * (index + 1),
      });
    });

    gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
    gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
    gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
    gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      ease,
      onComplete: resolve,
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

function relayout() {
  if (transitioning) {
    pendingRelayout = true;
    return;
  }
  offsetTop = window.innerHeight - 430;
  offsetLeft = window.innerWidth - 830;
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
    gsap.set(getCardContent(i), { x, y: offsetTop + cardHeight - 100 });
  });

  gsap.set("#pagination", { top: offsetTop + 330, left: offsetLeft });
  gsap.set(".cover", { x: window.innerWidth + 400 });
}

function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(relayout, 150);
}

const cards = data
  .map(
    (i, index) =>
      `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`,
  )
  .join("");

const cardContents = data
  .map(
    (i, index) => `<div class="card-content" id="card-content-${index}">
      <div class="content-start"></div>
      <div class="content-place">${i.place}</div>
      <div class="content-title-1">${i.title}</div>
      <div class="content-title-2">${i.title2}</div>
    </div>`,
  )
  .join("");

_("demo").innerHTML = cards + cardContents;
  .join("");

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start();
