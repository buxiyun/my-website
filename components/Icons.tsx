import { SVGProps } from "react";

/* ===========================================================
   TLU two-tone "Keying" style icons.
   Flat, filled silhouettes in two tones (dark slate + steel blue),
   matching the company icon library. Sit on a light .icon-tile.
   =========================================================== */

const D = "#234e68"; // dark slate
const L = "#9fb6c4"; // steel blue

type P = SVGProps<SVGSVGElement>;
const box = (p: P) => ({ viewBox: "0 0 48 48", ...p });

export const IconStrategy = (p: P) => (
  <svg {...box(p)}>
    <circle cx="24" cy="24" r="20" fill={L} />
    <polygon points="24,9 28.5,24 24,21 19.5,24" fill={D} />
    <polygon points="24,39 28.5,24 24,27 19.5,24" fill={D} opacity="0.5" />
    <circle cx="24" cy="24" r="3" fill={D} />
  </svg>
);

export const IconOperations = (p: P) => (
  <svg {...box(p)}>
    <g fill={D}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="21" y="3" width="6" height="11" rx="1.5" transform={`rotate(${a} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="15" />
    </g>
    <circle cx="24" cy="24" r="6" fill={L} />
  </svg>
);

export const IconData = (p: P) => (
  <svg {...box(p)}>
    <path d="M9 13 C9 16 15 18 24 18 C33 18 39 16 39 13 L39 35 C39 38 33 40 24 40 C15 40 9 38 9 35 Z" fill={D} />
    <ellipse cx="24" cy="13" rx="15" ry="5" fill={L} />
    <path d="M9 24 C9 27 15 29 24 29 C33 29 39 27 39 24" fill="none" stroke={L} strokeWidth="2" />
  </svg>
);

export const IconContent = (p: P) => (
  <svg {...box(p)}>
    <rect x="6" y="11" width="36" height="26" rx="3" fill={D} />
    <rect x="10" y="15" width="28" height="18" fill={L} />
    <circle cx="17" cy="21" r="3" fill={D} />
    <path d="M12 33 L20 25 L26 31 L31 26 L38 33 Z" fill={D} />
  </svg>
);

export const IconInsight = (p: P) => (
  <svg {...box(p)}>
    <circle cx="24" cy="19" r="12" fill={L} />
    <rect x="18" y="29" width="12" height="6" fill={D} />
    <rect x="19.5" y="35" width="9" height="4" rx="2" fill={D} />
    <path d="M24 11 v10 M20 16 h8" stroke={D} strokeWidth="2" fill="none" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg {...box(p)}>
    <path d="M24 4 L41 10 V25 C41 35 33 41 24 44 C15 41 7 35 7 25 V10 Z" fill={L} />
    <path d="M24 4 L7 10 V25 C7 35 15 41 24 44 Z" fill={D} />
    <path d="M16 24 l5 5 l10 -12" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTarget = (p: P) => (
  <svg {...box(p)}>
    <rect x="10" y="8" width="28" height="34" rx="3" fill={D} />
    <rect x="14" y="12" width="20" height="26" fill={L} />
    <rect x="19" y="5" width="10" height="6" rx="2" fill={D} />
    <path d="M17 23 l4 4 l8 -9" stroke={D} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChart = (p: P) => (
  <svg {...box(p)}>
    <rect x="8" y="26" width="8" height="14" rx="1" fill={L} />
    <rect x="20" y="16" width="8" height="24" rx="1" fill={D} />
    <rect x="32" y="30" width="8" height="10" rx="1" fill={L} />
  </svg>
);

export const IconUsers = (p: P) => (
  <svg {...box(p)}>
    <circle cx="14" cy="19" r="5" fill={L} />
    <path d="M5 38 a9 9 0 0 1 18 0 z" fill={L} />
    <circle cx="34" cy="19" r="5" fill={L} />
    <path d="M25 38 a9 9 0 0 1 18 0 z" fill={L} />
    <circle cx="24" cy="16" r="6" fill={D} />
    <path d="M13 40 a11 11 0 0 1 22 0 z" fill={D} />
  </svg>
);

export const IconNetwork = (p: P) => (
  <svg {...box(p)}>
    <circle cx="24" cy="24" r="20" fill={L} />
    <g fill="none" stroke={D} strokeWidth="2">
      <circle cx="24" cy="24" r="20" />
      <ellipse cx="24" cy="24" rx="8" ry="20" />
      <line x1="4" y1="24" x2="44" y2="24" />
      <path d="M8 14 H40" />
      <path d="M8 34 H40" />
    </g>
  </svg>
);

export const IconGlobe = IconNetwork;

export const IconMail = (p: P) => (
  <svg {...box(p)}>
    <rect x="6" y="12" width="36" height="24" rx="3" fill={L} />
    <path d="M6 14 L24 27 L42 14 L42 19 L24 31 L6 19 Z" fill={D} />
  </svg>
);

/* --- simple UI strokes (not content icons) --- */
export const IconArrow = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);
