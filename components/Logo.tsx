import Link from "next/link";
import Image from "next/image";

export default function Logo({
  variant = "dark",
  href = "/",
  zh = false,
}: {
  variant?: "dark" | "light";
  href?: string;
  zh?: boolean;
}) {
  const src = variant === "light" ? "/tlu-logo-white.png" : "/tlu-logo.png";

  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group">
      <Image
        src={src}
        alt="TLU · The Leap Union"
        width={180}
        height={24}
        priority
        className="shrink-0 h-[28px] w-auto transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span
        className="block text-[0.62rem] font-semibold tracking-[0.12em] whitespace-nowrap"
        style={{ color: variant === "light" ? "rgba(255,255,255,0.7)" : "#5b6472" }}
      >
        {zh ? "你的全球增长伙伴" : "Your Global Growth Partner"}
      </span>
    </Link>
  );
}
