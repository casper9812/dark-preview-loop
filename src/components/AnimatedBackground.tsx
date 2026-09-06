export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Soft base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, color-mix(in oklch, var(--foreground) 3%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, color-mix(in oklch, var(--foreground) 4%, transparent) 0%, transparent 55%)",
        }}
      />

      {/* Brand blob top-right */}
      <div
        className="animate-aurora absolute -right-[12%] -top-[12%] h-[70vh] w-[70vh] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--brand) 12%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Secondary blob bottom-left */}
      <div
        className="animate-aurora-reverse absolute -bottom-[18%] -left-[14%] h-[80vh] w-[80vh] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--brand-2) 9%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Neutral center blob */}
      <div
        className="animate-aurora absolute left-1/2 top-[45%] h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--foreground) 5%, transparent) 0%, transparent 65%)",
          animationDelay: "-12s",
        }}
      />

      {/* Slow rotating ring wash */}
      <div
        className="animate-slow-rotate absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, color-mix(in oklch, var(--brand) 3%, transparent) 20%, transparent 40%, color-mix(in oklch, var(--brand-2) 2%, transparent) 60%, transparent 80%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--foreground) 35%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.025,
        }}
      />
    </div>
  );
}
