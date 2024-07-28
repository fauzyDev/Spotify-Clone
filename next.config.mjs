import withPWAInit from "@ducanh2912/next-pwa";
/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NEXTAUTH_URL: "http://localhost:3000",
      },

    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [
            {
                hostname: "i.scdn.co"
            },
            {
                hostname: "image-cdn-ak.spotifycdn.com"
            },
            {
                hostname: "mosaic.scdn.co"
            },
            {
                hostname: "*"
            },
            {
                hostname: "**"
            }
        ]
    }

};

const withPWA = withPWAInit({
    dest: "public",
  });

export default withPWA(nextConfig);
