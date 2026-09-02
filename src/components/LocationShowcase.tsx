import { useEffect, useState } from "react";
import { MapPin, Images, Navigation } from "lucide-react";

import shot1 from "@/assets/WhatsApp_Image_2026-08-26_at_21.37.34_1.jpeg.asset.json";
import shot2 from "@/assets/WhatsApp_Image_2026-08-26_at_21.37.34.jpeg.asset.json";
import shot3 from "@/assets/WhatsApp_Image_2026-08-26_at_21.37.35.jpeg.asset.json";
import shot4 from "@/assets/WhatsApp_Image_2026-08-26_at_21.38.23.jpeg.asset.json";
import shot5 from "@/assets/WhatsApp_Image_2026-08-19_at_16.05.32.jpeg.asset.json";
import shot6 from "@/assets/WhatsApp_Image_2026-08-19_at_16.05.33.jpeg.asset.json";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Av.%20de%20las%20Aves%20229,%20Villas%20de%20Pachuca,%2042083%20Pachuca%20de%20Soto,%20Hidalgo&output=embed";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Av.+de+las+Aves+229,+Villas+de+Pachuca,+42083+Pachuca+de+Soto,+Hidalgo";

const gallery = [
  { url: shot1.url, caption: "Área de terapia manual" },
  { url: shot2.url, caption: "Zona de fuerza guiada" },
  { url: shot3.url, caption: "Rehabilitación de tobillo y rodilla" },
  { url: shot4.url, caption: "Movilidad articular" },
  { url: shot5.url, caption: "Readaptación deportiva" },
  { url: shot6.url, caption: "Masoterapia y descarga" },
];

export function LocationShowcase() {
  const [tab, setTab] = useState<"mapa" | "fotos">("mapa");
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % gallery.length), 3800);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_95px_-45px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-border p-4">
        {(
          [
            ["mapa", "Mapa", MapPin],
            ["fotos", "Fotos del lugar", Images],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
              tab === key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener"
          className="ml-auto hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground sm:inline-flex"
        >
          <Navigation className="h-3.5 w-3.5" />
          Abrir
        </a>
      </div>

      <div className="relative h-[380px] sm:h-[460px]">
        {tab === "mapa" ? (
          <iframe
            key="mapa"
            title="Ubicación de FAXIA Salud en Google Maps"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="animate-fade-in h-full w-full border-0 grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        ) : (
          <div
            key="fotos"
            className="animate-fade-in relative h-full w-full overflow-hidden bg-secondary"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {gallery.map((g, idx) => (
              <img
                key={g.url}
                src={g.url}
                alt={`FAXIA Salud — ${g.caption}`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-contain transition-all duration-1000 ease-out ${
                  idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                {gallery[i]?.caption}
              </p>
            </div>
            <div className="absolute bottom-5 right-5 flex gap-1.5">
              {gallery.map((g, idx) => (
                <button
                  key={g.url}
                  type="button"
                  aria-label={`Ver ${g.caption}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                    idx === i ? "w-7 opacity-100" : "w-1.5 opacity-50 hover:opacity-80"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
