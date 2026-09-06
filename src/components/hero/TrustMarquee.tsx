import { Lightning, LockSimple, Wine, Confetti, Truck, CreditCard } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: Lightning, text: "Entrega en 1-2 horas" },
  { icon: LockSimple, text: "Compra 100% segura" },
  { icon: Wine, text: "+25 productos" },
  { icon: Confetti, text: "Combos Fiesteros" },
  { icon: Truck, text: "Envíos a todo Costa Rica" },
  { icon: CreditCard, text: "SINPE, tarjeta o efectivo" },
];

export function TrustMarquee() {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden py-4" style={{ background: "#1E1A17", borderTop: "1px solid rgba(242,169,0,0.14)", borderBottom: "1px solid rgba(242,169,0,0.14)" }}>
      <div className="flex w-max animate-marquee gap-10">
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap" style={{ color: "#B8B1A7" }}>
            <item.icon size={16} weight="bold" color="#4CD671" />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
