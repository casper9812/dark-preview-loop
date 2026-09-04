const MAPS_EMBED =
  "https://www.google.com/maps?q=Av.%20de%20las%20Aves%20229,%20Villas%20de%20Pachuca,%2042083%20Pachuca%20de%20Soto,%20Hidalgo&output=embed";

export function LocationShowcase() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_95px_-45px_rgba(0,0,0,0.6)]">
      <div className="relative h-[380px] overflow-hidden sm:h-[520px]">
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
