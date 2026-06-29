import Link from "next/link";

/**
 * TLU — The Leap Union wordmark.
 * Recreated from the official logo: heavy "TLU" lettering with the
 * folded top-left corner on the T and chamfered base on the U,
 * paired with "The Leap Union". `currentColor` drives the mark so it
 * works on light (blue) and dark (white) surfaces.
 */
const TLU_BLUE = "#1f2bff";

export default function Logo({
  variant = "dark",
  href = "/",
  zh = false,
}: {
  variant?: "dark" | "light";
  href?: string;
  zh?: boolean;
}) {
  const markColor = variant === "light" ? "#ffffff" : TLU_BLUE;
  const wordColor = variant === "light" ? "#ffffff" : "#0a0a0a";

  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group">
      <svg
        viewBox="0 0 330 124"
        height="26"
        role="img"
        aria-label="TLU"
        style={{ color: markColor }}
        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <g fill="currentColor">
          {/* T with folded top-left corner */}
          <path d="M48,0 L104,0 L104,34 L0,34 L0,30 Z" />
          <path d="M0,0 L42,0 L0,26 Z" />
          <path d="M35,34 L69,34 L69,124 L35,124 Z" />
          {/* L */}
          <path d="M124,0 L158,0 L158,90 L208,90 L208,124 L124,124 Z" />
          {/* U with chamfered base */}
          <path d="M228,0 L262,0 L262,92 L294,92 L294,0 L328,0 L328,104 L312,124 L244,124 L228,104 Z" />
        </g>
      </svg>
      <span className="leading-tight">
        <span
          className="block text-[1.02rem] font-extrabold tracking-tight whitespace-nowrap"
          style={{ color: wordColor }}
        >
          The Leap Union
        </span>
        <span
          className="block text-[0.62rem] font-semibold tracking-[0.12em] whitespace-nowrap"
          style={{ color: variant === "light" ? "rgba(255,255,255,0.7)" : "#5b6472" }}
        >
          {zh ? "你的全球增长伙伴" : "Your Global Growth Partner"}
        </span>
      </span>
    </Link>
  );
}
