import Link from "next/link";

export default function Logo({
  variant = "dark",
  href = "/",
  zh = false,
}: {
  variant?: "dark" | "light";
  href?: string;
  zh?: boolean;
}) {
  const src = variant === "light" ? "/tlu-logo-white.svg" : "/tlu-logo.svg";

  return (
    <Link href={href} className="inline-flex items-center gap-2 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="TLU · The Leap Union"
        height={28}
        className="shrink-0 w-auto h-[28px] transition-transform duration-300 group-hover:-translate-y-0.5"
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
