import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  // Environment variables
  env: {
    apiKey: "AIzaSyBJeDsnPiPmQPKMe8KqnGyBj351U1gssGU",
    model: "gemini-2.0-flash-exp-image-generation"
  }
}

export default nextConfig;
