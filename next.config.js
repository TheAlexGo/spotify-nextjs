/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: process.env.BUILD_OUTPUT || 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'xdkfehqoxgskldcdwgpp.supabase.co'
            }
        ],
    }
}

module.exports = nextConfig
