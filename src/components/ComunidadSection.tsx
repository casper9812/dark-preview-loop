import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Bike, Footprints, Trophy, Volleyball } from "lucide-react";

import run88 from "@/assets/comunidad-88run.jpg";
import mtb from "@/assets/comunidad-mtb.jpg";
import volley from "@/assets/comunidad-volley.jpg";
import fc from "@/assets/comunidad-fc.jpg";

const WHATSAPP = "https://wa.me/527715037762";

const clubs = [
  {
    name: "88RUN x FAXIA",
    tag: "Running",
    icon: Footprints,
    image: run88,
    desc: "Rodadas y entrenamientos de calle con acompañamiento fisioterapéutico, análisis de pisada y prevención de lesiones.",
  },
  {
    name: "FAXIA MTB",
    tag: "Mountain bike",
    icon: Bike,
    image: mtb,
    desc: "Ciclismo de montaña con trabajo de movilidad, fuerza de cadena posterior y recuperación después de cada ruta.",
  },
  {
    name: "FAXIA Volleyball Club",
    tag: "Voleibol",
    icon: Volleyball,
    image: volley,
    desc: "Equipo de voleibol con programa de salto, control de hombro y rodilla para competir toda la temporada.",
  },
  {
    name: "FAXIA FC",
    tag: "Fútbol",
    icon: Trophy,
    image: fc,
    desc: "Nuestro equipo de fútbol: readaptación deportiva, prevención de lesiones de rodilla y retorno seguro a la cancha.",
  },
];

function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="[transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-8px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

export function ComunidadSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="comunidad" className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:26px_26px]" />
      <div ref={sectionRef} className="relative mx-auto max-w-6xl px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
          <span className="h-1.5 w-1.5 animate-ping rounded-full brand-gradient" />
          Comunidad
        </span>
        <h2 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Entrenamos juntos, nos recuperamos juntos.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
          FAXIA no termina en el consultorio: somos clubes deportivos que entrenan, compiten y se cuidan
          con acompañamiento fisioterapéutico real.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {clubs.map(({ name, tag, icon: Icon, image, desc }, i) => (
            <div
              key={name}
              className={`transition-all duration-700 ease-out ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              <Tilt>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.04]">
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <img
                      src={image}
                      alt={`${name} — club deportivo de FAXIA Salud`}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:saturate-[1.15]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
                      <Icon className="h-3.5 w-3.5" />
                      {tag}
                    </span>
                    <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {name}
                    </h3>
                  </div>
                  <div className="p-7">
                    <p className="text-sm leading-relaxed text-primary-foreground/70">{desc}</p>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener"
                      className="mt-7 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand transition-all duration-300 hover:gap-4"
                    >
                      Únete al club
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
