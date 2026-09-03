import { MapPin, Navigation } from "lucide-react";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Av.%20de%20las%20Aves%20229,%20Villas%20de%20Pachuca,%2042083%20Pachuca%20de%20Soto,%20Hidalgo&output=embed";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Av.+de+las+Aves+229,+Villas+de+Pachuca,+42083+Pachuca+de+Soto,+Hidalgo";

export function LocationShowcase() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_95px_-45px_rgba(0,0,0,0.6)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] brand-gradient opacity-70" />

      <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground">
          <MapPin className="h-3.5 w-3.5" />
          Av. de las Aves 229
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Villas de Pachuca, Hidalgo
        </span>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 hover:text-brand"
        >
          <Navigation className="h-3.5 w-3.5" />
          Cómo llegar
        </a>
      </div>

      <div className="relative h-[380px] overflow-hidden sm:h-[460px]">
        <iframe
          title="Ubicación de FAXIA Salud en Google Maps"
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
