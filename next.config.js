/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["thispersondoesnotexist.com", "appsumo2-cdn.appsumo.com", "www.gravatar.com"]
  }
};

module.exports = nextConfig;
