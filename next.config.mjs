/** @type {import('next').NextConfig} */
const nextConfig = {
     images:{
        domains:[
            'uploadthing.com',
            'utfs.io',
            'img.clerk.com',
            'subdomain',
            'files.clerk.com',
            'placehold.co',
            'placehold.co/300x300?text=Product+Image'
        ]
     },
    reactStrictMode:false
};

export default nextConfig;
