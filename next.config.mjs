/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**', // This allows all paths from the Firebase storage bucket
            },
        ],
    },
};

export default nextConfig;
