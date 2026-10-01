import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // 注意：不要给 /internal/interview-outline 加"无尾斜杠→带尾斜杠"的 redirects！
  // trailingSlash:false 会把带尾斜杠 308 回无尾斜杠，两者互跳形成无限重定向循环（2026-10-01 事故）。
  // 无尾斜杠下的相对路径解析靠 index.html 内动态 base 注入兜底。
};

export default nextConfig;
