import Image from "next/image";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark-v2.png"
      alt="ACL Drinks"
      width={512}
      height={512}
      priority
      className={`${className} object-contain`}
    />
  );
}
