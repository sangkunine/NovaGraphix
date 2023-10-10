/** @type {import('next').NextConfig} */

const nextConfig =
{
    images: {
        domains: [
            'www.notion.so',
            'images.unsplash.com',
            's3.us-west-2.amazonaws.com', // thumbnail in fileCabinets
        ]
    }
}

module.exports = nextConfig
