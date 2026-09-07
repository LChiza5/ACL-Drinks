import Image from "next/image";

export function Logo({ className = "h-9 w-9", sizes = "48px" }: { className?: string; sizes?: string }) {
  return (
    <Image
      src="/logo-mark-v2.png"
      alt="ACL Drinks"
      width={512}
      height={512}
      priority
      sizes={sizes}
      className={`${className} object-contain`}
    />
  );
}
