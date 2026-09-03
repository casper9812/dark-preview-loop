import { useEffect, useRef, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  HeartHandshake,
  Instagram,
  Facebook,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  ArrowUpRight,
  Check,
} from "lucide-react";

import teamXimena from "@/assets/WhatsApp_Image_2026-08-26_at_21.37.34_1.jpeg.asset.json";
import teamAntonio from "@/assets/WhatsApp_Image_2026-08-19_at_16.05.32.jpeg.asset.json";
import { LocationShowcase } from "@/components/LocationShowcase";
import { ComunidadSection } from "@/components/ComunidadSection";

const INSTAGRAM = "https://www.instagram.com/faxia.salud/";
const FACEBOOK = "https://www.facebook.com/faxia.salud";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Av.+de+las+Aves+229,+Villas+de+Pachuca,+42083+Pachuca+de+Soto,+Hidalgo";
const WHATSAPP = "https://wa.me/527715037762";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FAXIA Salud | Fisioterapia y Rehabilitación en Pachuca" },
      {
        name: "description",
        content:
          "FAXIA Fisioterapia en Villas de Pachuca: terapia manual, rehabilitación de lesiones y readaptación deportiva. Agenda tu primera sesión.",
      },
      { property: "og:title", content: "FAXIA Salud | Fisioterapia y Rehabilitación" },
      {
        property: "og:description",
        content:
          "Terapia manual, rehabilitación clínica y readaptación deportiva con fisioterapeutas certificados en Pachuca, Hidalgo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Equipo", href: "#equipo" },
  { label: "Costos", href: "#costos" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

const pillars = [
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    desc: "Cada plan se diseña sobre tu diagnóstico, tu ritmo y tus objetivos reales.",
  },
  {
    icon: Activity,
    title: "Tratamientos efectivos",
    desc: "Técnicas basadas en evidencia clínica con seguimiento medible sesión a sesión.",
  },
  {
    icon: ShieldCheck,
    title: "Profesionales certificados",
    desc: "Fisioterapeutas titulados con formación continua en terapia especializada.",
  },
  {
    icon: Sparkles,
    title: "Rehabilitación y rendimiento",
    desc: "Del dolor a la alta deportiva: recupera movilidad, fuerza y confianza.",
  },
];

const team = [
  {
    name: "Ximena Amezcua",
    role: "Fisioterapeuta especialista",
    image: teamXimena.url,
    desc: "Especialista en terapia manual ortopédica y rehabilitación de tejidos blandos. Diseña planes personalizados que combinan precisión diagnóstica, movilización articular y entrenamiento funcional para una recuperación completa.",
  },
  {
    name: "Antonio García",
    role: "Fisioterapeuta especialista",
    image: teamAntonio.url,
    desc: "Experto en readaptación deportiva y rendimiento físico. Acompaña a pacientes desde la lesión aguda hasta el retorno a la alta exigencia, integrando fisioterapia, fuerza y control motor.",
  },
];

const plans = [
  {
    title: "Fisioterapia Convencional",
    subtitle: "Sesión individual",
    price: "400",
    features: ["Valoración inicial", "Terapia manual", "Plan de ejercicio"],
    dark: false,
  },
  {
    title: "Paquete 5 Sesiones",
    subtitle: "Fisioterapia convencional",
    price: "1,700",
    badge: "Ahorras $300",
    features: ["5 sesiones completas", "Seguimiento de progreso", "Rutina en casa"],
    dark: false,
  },
  {
    title: "Paquete 10 Sesiones",
    subtitle: "Fisioterapia convencional",
    price: "3,300",
    badge: "Ahorras $700",
    features: ["10 sesiones completas", "Reevaluación clínica", "Prevención de recaídas"],
    dark: true,
  },
  {
    title: "Fisioterapia Especializada",
    subtitle: "Mínimamente invasiva · Valoración + tratamiento",
    price: "600",
    features: ["Punción seca / técnicas avanzadas", "Diagnóstico funcional", "Tratamiento el mismo día"],
    dark: false,
  },
];

const reviews = [
  {
    text: "¡Excelente atención y servicio! Me ayudaron mucho con mi rehabilitación y como plus, también atendí mi salud bucal. Todo su personal está ampliamente capacitado.",
    name: "Francisco Samuel Pérez Cadena",
    when: "Hace 1 año",
  },
  {
    text: "Excelente atención y servicio, las terapias son muy buenas, me han solucionado dos problemas que con otros terapeutas no veía mejoría. Los recomiendo ampliamente, desde las primeras sesiones ves resultados.",
    name: "R Sosa",
    when: "Hace 10 meses",
  },
  {
    text: "¡De lo mejor! Excelente lugar, gran atención y servicio. Instalaciones de primer nivel y el personal altamente capacitado. ¡Lo recomiendo ampliamente!",
    name: "Andrea Pineda",
    when: "Hace 1 año",
  },
  {
    text: "He llevado a algunos integrantes de mi familia, la calidad y efectividad del servicio es excelente, la atención de calidad, todo excelente y la recuperación es muy rápida desde la primera sesión!",
    name: "Ismecal Baez",
    when: "Hace 4 meses",
  },
  {
    text: "Excelente atención y servicio. Se toman el tiempo de explicarte cada ejercicio y el porqué de cada técnica. Volvería sin dudarlo.",
    name: "Sergio Lozada Morales",
    when: "Hace 6 meses",
  },
];

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
      {children}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`text-xl font-semibold tracking-[0.35em] ${inverted ? "text-background" : "text-foreground"}`}
    >
      FA<span className="text-muted-foreground">X</span>IA
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating nav */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border border-border bg-background/80 px-6 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <a href="#top" aria-label="FAXIA Fisioterapia">
            <Logo />
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="hidden h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary sm:grid"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Agenda
            </a>
          </div>
        </nav>
      </header>

      {/* Hero: cinematic carousel */}
      <section id="top" className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
        <iframe
          src="/faxia/index.html"
          title="FAXIA Salud"
          className="absolute inset-0 h-full w-full border-0"
        />
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Badge>Acerca de FAXIA</Badge>
        <h2 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Rehabilitación clínica con estándar prémium.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          En FAXIA Fisioterapia combinamos evaluación precisa, terapia manual avanzada y entrenamiento
          funcional en un espacio pensado para tu recuperación. Sin prisas, sin recetas genéricas: un
          proceso claro hasta que vuelvas a moverte sin límites.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-border p-7 transition-all duration-300 hover:-translate-y-2 hover:border-foreground/40 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.4)]">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-lg font-semibold leading-snug">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section id="equipo" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Especialistas dedicados a tu recuperación.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          En FAXIA cada tratamiento es dirigido por fisioterapeutas certificados con formación continua,
          comprometidos con devolverte movilidad, fuerza y confianza.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 150}>
              <article className="group overflow-hidden rounded-3xl border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
                <img
                  src={m.image}
                  alt={`${m.name}, ${m.role} en FAXIA Fisioterapia`}
                  loading="lazy"
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold tracking-tight">{m.name}</h3>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {m.role}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Costos */}
      <section id="costos" className="bg-secondary/40 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Badge>Menú de costos</Badge>
          <h2 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Una inversión a tu medida.
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {plans.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
              <div
                className={`h-full rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)] ${
                  p.dark
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-foreground/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                    <p
                      className={`mt-2 text-[11px] font-medium uppercase tracking-[0.18em] ${
                        p.dark ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      {p.subtitle}
                    </p>
                  </div>
                  {p.badge && (
                    <span
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] ${
                        p.dark ? "bg-background text-foreground" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-10 flex items-end gap-2">
                  <span className="text-2xl font-bold">$</span>
                  <span className="text-6xl font-bold leading-none tracking-tight">{p.price}</span>
                  <span
                    className={`pb-2 text-[11px] font-medium uppercase tracking-[0.18em] ${
                      p.dark ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    MXN
                  </span>
                </div>
                <ul className="mt-10 space-y-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0" />
                      <span className={p.dark ? "text-primary-foreground/80" : "text-muted-foreground"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  className={`mt-10 flex items-center justify-between rounded-full px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-90 ${
                    p.dark ? "bg-background text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  Agendar este plan
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ComunidadSection />

      {/* Opiniones */}
      <section id="opiniones" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Badge>Opiniones</Badge>
          <h2 className="mt-8 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Historias de quienes ya recuperaron su mejor versión.
          </h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=FAXIA+Fisioterapia+Pachuca"
            target="_blank"
            rel="noopener"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-border px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-secondary"
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            Ver opiniones en Google
          </a>
        </div>
        <div className="marquee-paused mt-14 overflow-hidden pb-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max gap-6 px-6">
            {[...reviews, ...reviews].map((r, idx) => (
              <figure
                key={`${r.name}-${idx}`}
                className="flex w-[300px] shrink-0 flex-col justify-between rounded-3xl border border-border p-7 transition-colors duration-300 hover:border-foreground/40 sm:w-[340px]"
              >
                <div>
                  <Quote className="h-6 w-6 text-muted-foreground/50" />
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {r.text}
                  </blockquote>
                </div>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Reseña en Google · {r.when}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Badge>Ubicación</Badge>
            <h2 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Villas de Pachuca, Hidalgo
            </h2>
            <p className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              Av. de las Aves 229, Villas de Pachuca, C.P. 42038, Pachuca de Soto, Hidalgo, México
            </p>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Navigation className="h-4 w-4" />
              Cómo llegar
            </a>
          </div>
          <Reveal delay={150}>
            <LocationShowcase />
          </Reveal>
        </div>
      </section>

      {/* Contacto */}
      <footer id="contacto" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                Ubicación y contacto
              </span>
              <h2 className="mt-8 max-w-md text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Estamos listos para tu primera sesión.
              </h2>
              <p className="mt-10 flex items-start gap-4 text-sm text-primary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Avenida de las Aves 229, Villas de Pachuca, Pachuca de Soto, Hidalgo.
              </p>
              <a
                href="tel:+527715037762"
                className="mt-5 flex items-center gap-4 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4 shrink-0" />
                771 503 7762
              </a>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 rounded-full bg-primary-foreground px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-primary transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Agenda tu cita
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="grid h-14 w-14 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={FACEBOOK}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="grid h-14 w-14 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Reveal delay={150}>
            <div className="rounded-3xl border border-primary-foreground/15 p-9 transition-all duration-300 hover:-translate-y-2 hover:border-primary-foreground/35">
              <Logo inverted />
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.35em] text-primary-foreground/60">
                Fisioterapia
              </p>
              <p className="mt-10 text-sm font-medium">Horario de atención</p>
              <dl className="mt-6 text-sm">
                {[
                  ["Lunes a Viernes", "9:00 — 20:00"],
                  ["Sábado", "9:00 — 13:00"],
                  ["Domingo", "Cerrado"],
                ].map(([day, hours], i, arr) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-4 ${
                      i < arr.length - 1 ? "border-b border-primary-foreground/15" : ""
                    }`}
                  >
                    <dt className="text-primary-foreground/70">{day}</dt>
                    <dd className="font-medium">{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            </Reveal>
          </div>

          <div className="mt-20 border-t border-primary-foreground/15 pt-16">
            <p className="text-center text-4xl font-bold leading-[1.05] tracking-tight text-primary-foreground/90 sm:text-6xl md:text-7xl">
              RECUPERA • FORTALECE • SUPÉRATE
            </p>
            <p className="mt-12 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground/50">
              © 2026 FAXIA Fisioterapia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
