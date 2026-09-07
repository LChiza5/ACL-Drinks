import { Package } from "@phosphor-icons/react/dist/ssr";
import { ProductImage } from "@/components/products/ProductImage";
import type { Kit } from "@/types";

/**
 * A combo's image problem: a single stock photo of people drinking does not
 * show what is in the box, and there is rarely a studio shot of the exact
 * bundle. So unless the combo has its own verified photo, the card builds the
 * image out of its member products — the customer sees the actual bottles and
 * the quantity of each, which is what they are paying for.
 *
 * This is data-driven, so it keeps working when the combo's contents change.
 */
export function KitComposite({ kit, sizes }: { kit: Kit; sizes: string }) {
  if (kit.image) {
    return (
      <ProductImage
        src={kit.image}
        name={kit.name}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  const members = (kit.kitProducts ?? []).filter((kp) => kp.product).slice(0, 3);

  if (members.length === 0) {
    return (
      <div className="absolute inset-0 grid place-items-center" role="img" aria-label={`${kit.name}: foto pendiente`}>
        <Package size={44} weight="duotone" color="#4A4038" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-stretch justify-center gap-2 p-4"
      role="img"
      aria-label={`${kit.name}: contiene ${members
        .map((kp) => `${kp.quantity} ${kp.product!.name}`)
        .join(", ")}`}
    >
      {members.map((kp) => (
        <div key={kp.id} className="relative flex-1">
          <ProductImage
            src={kp.product!.images[0]}
            name={kp.product!.name}
            brand={kp.product!.brand}
            volume={kp.product!.volume}
            sizes="(max-width: 768px) 30vw, 12vw"
          />
          {kp.quantity > 1 && (
            <span
              className="absolute bottom-0 right-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
              style={{ background: "#F2A900", color: "#241a05" }}
            >
              ×{kp.quantity}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
