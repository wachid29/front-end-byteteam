/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["media.suara.com"],
	},
};

module.exports = nextConfig;
