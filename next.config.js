/** @type {import('next').NextConfig} */
const nextConfig = {
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
