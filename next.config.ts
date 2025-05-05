import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  // Environment variables
  env: {
    email: "tabbycatmakegames@gmail.com",
    apiKey: "AIzaSyA7ErpG1h6OkjWeXhsCcdPSrJLBa3_u6kk",
    model: "gemini-2.0-flash-exp-image-generation"
  }
}

export default nextConfig;
