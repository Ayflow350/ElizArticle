import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // Specify the protocol (e.g., 'https')
        hostname: "res.cloudinary.com", // Domain of the external source
        port: "", // Leave this blank if there's no specific port
        pathname: "/drczkfgqp/image/upload/**", // Pattern to match specific image paths (use ** for any path under this structure)
      },
    ],
  },
};

export default nextConfig;
