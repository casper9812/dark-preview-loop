import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FAXIA Salud | Fisioterapia y Rehabilitación" },
      {
        name: "description",
        content:
          "FAXIA Salud: fisioterapia, terapia manual y readaptación deportiva. Recupera tu movilidad sin dolor y agenda tu sesión.",
      },
      { property: "og:title", content: "FAXIA Salud | Fisioterapia y Rehabilitación" },
      {
        property: "og:description",
        content:
          "Terapia manual, rehabilitación de lesiones y readaptación deportiva en FAXIA Salud.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/faxia/index.html"
      title="FAXIA Salud"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
