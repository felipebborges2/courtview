// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // não falha o build por lint na Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // se você usar imagens remotas, adicione aqui (opcional):
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "upload.wikimedia.org" },
  //   ],
  // },
};

export default nextConfig;
