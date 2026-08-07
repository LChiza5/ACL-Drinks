const items = [
  "🧊 Entrega en 1-2 horas",
  "🔒 Compra 100% segura",
  "🍾 +25 productos",
  "🎉 Combos Fiesteros",
  "🚚 Envíos a todo Costa Rica",
  "💳 SINPE, tarjeta o efectivo",
];

export function TrustMarquee() {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden py-4" style={{ background: "#1E1A17", borderTop: "1px solid rgba(166,124,82,0.12)", borderBottom: "1px solid rgba(166,124,82,0.12)" }}>
      <div className="flex w-max animate-marquee gap-10">
        {track.map((item, i) => (
          <span key={i} className="text-sm font-semibold whitespace-nowrap" style={{ color: "#B8B1A7" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
