/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**', // Allows all paths from the Firebase storage bucket
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**', // Allows all paths from Google User Content
            },
        ],
    },
};

export default nextConfig;
