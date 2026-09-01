import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const FAXIA_POSITION: [number, number] = [20.0550533, -98.7853785];

export function FaxiaMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;
    let map: import("leaflet").Map | undefined;

    (async () => {
      const L = await import("leaflet");
      if (destroyed || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: FAXIA_POSITION,
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        className: "faxia-marker",
        html: '<span class="faxia-marker-pulse"></span><span class="faxia-marker-dot"></span>',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker(FAXIA_POSITION, { icon })
        .addTo(map)
        .bindPopup(
          '<strong>FAXIA Salud</strong><br/>Av. de las Aves 229, Villas de Pachuca<br/><a href="https://www.google.com/maps/search/?api=1&query=Av.+de+las+Aves+229,+Villas+de+Pachuca,+Pachuca,+Hidalgo" target="_blank" rel="noopener">Cómo llegar</a>'
        );

      const el = containerRef.current;
      const onEnter = () => map?.setZoom(17, { animate: true });
      const onLeave = () => map?.setZoom(16, { animate: true });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    })();

    return () => {
      destroyed = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
      <div
        ref={containerRef}
        className="h-[420px] w-full grayscale transition-all duration-700 group-hover:grayscale-0 sm:h-[520px]"
      />
      <div className="pointer-events-none absolute left-5 top-5 z-[500] rounded-full border border-border bg-background/90 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
        FAXIA Salud · Villas de Pachuca
      </div>
    </div>
  );
}
