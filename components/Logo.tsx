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
  const markColor = variant === "light" ? "#ffffff" : "#0936ff";
  const textColor = variant === "light" ? "#ffffff" : "#0a0a0a";
  const tagColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#5b6472";

  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group">
      {/* TLU icon */}
      <svg
        viewBox="0 0 525 171"
        height="36"
        role="img"
        aria-label="TLU"
        style={{ color: markColor }}
        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M7.5 8.0L166.5 8.0L166.0 46.5L131.5 46.0L131.0 8.5L59.5 46.0L116.5 47.0L116.0 161.5L56.5 161.0L56.5 47.0L8.0 46.5L7.5 9.0ZM191.5 8.0L251.0 7.5L252.5 9.0L252.5 123.0L296.0 123.5L328.5 160.0L328.0 161.5L191.5 161.0L191.5 9.0ZM328.5 8.0L388.0 7.5L389.5 9.0L389.5 112.0L390.5 115.0L396.0 120.5L406.0 124.5L412.0 124.5L413.0 125.5L439.0 124.5L449.0 120.5L455.5 114.0L456.5 111.0L456.5 8.0L516.0 7.5L517.5 9.0L517.5 103.0L516.5 106.0L469.0 159.5L453.0 162.5L444.0 162.5L443.0 163.5L400.0 163.5L399.0 162.5L389.0 162.5L388.0 161.5L376.0 160.5L366.5 152.0L329.5 110.0L328.5 108.0L328.5 9.0Z"
        />
      </svg>

      {/* Text block: "The Leap Union" + tagline */}
      <span className="flex flex-col justify-between leading-tight" style={{ height: 36 }}>
        <span
          className="block text-[1.05rem] font-extrabold tracking-tight whitespace-nowrap"
          style={{ color: textColor }}
        >
          The Leap Union
        </span>
        <span
          className="block text-[0.58rem] font-semibold tracking-[0.12em] whitespace-nowrap"
          style={{ color: tagColor }}
        >
          {zh ? "你的全球增长伙伴" : "YOUR GLOBAL GROWTH PARTNER"}
        </span>
      </span>
    </Link>
  );
}
