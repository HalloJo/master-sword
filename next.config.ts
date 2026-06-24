import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is default in Next.js 16
  // GLB files are fetched from /public, no bundler config needed.
  // If Three.js shader imports cause issues, add resolveAlias here.
}

export default nextConfig
