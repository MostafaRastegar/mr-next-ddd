import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: 'edge',
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
