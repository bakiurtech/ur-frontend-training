import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ 
            protocol: 'https', 
            hostname: 'cdn.dummyjson.com' 
        }],
        qualities: [85, 95]
    },
}

export default nextConfig
