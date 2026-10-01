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
  async redirects() {
    return [
      // 嵌套静态站点：无尾斜杠访问会让页内相对资源解析到上级目录而404，
      // 统一308到带尾斜杠路径（index.html内另有动态base注入兜底）
      {
        source: "/internal/interview-outline",
        destination: "/internal/interview-outline/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
