/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Allow images from Cloudinary
  },
  productionBrowserSourceMaps: false, // Prevent source maps from being exposed in production
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable bundle analyzer if ANALYZE=true
})(nextConfig);
