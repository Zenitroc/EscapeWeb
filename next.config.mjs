import withPWA from 'next-pwa' with { default: { dest: 'public', register: true } };

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  }
};

export default withPWA(nextConfig);
