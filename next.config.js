/** @type {import('next').NextConfig} */

const nextConfig =
{
    images: {
        domains: [
            'www.notion.so',
            'images.unsplash.com',
            's3.us-west-2.amazonaws.com', // for notionDB
            'prod-files-secure.s3.us-west-2.amazonaws.com', // for notionDB
        ]
    }
}

module.exports = nextConfig
