/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["media.suara.com", "pwco.com.sg", "res.cloudinary.com"],
	},
};

module.exports = nextConfig;
