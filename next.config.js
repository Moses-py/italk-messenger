/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  generateEtags: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
