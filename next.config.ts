import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

module.exports = {
  // Environment variables
  env: {
    email: "tabbycatmakegames@gmail.com",
    apiKey: "AIzaSyA7ErpG1h6OkjWeXhsCcdPSrJLBa3_u6kk",
    model: "gemini-2.0-flash-exp-image-generation"
  },
  distDir: "build",
}

export default nextConfig;
