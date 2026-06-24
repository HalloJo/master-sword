import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is default in Next.js 16
  // GLB files are fetched from /public, no bundler config needed.
  // If Three.js shader imports cause issues, add resolveAlias here.

  // React Strict Mode double-mounts components in dev, which causes R3F to
  // create→dispose→recreate the WebGL context. postprocessing races that
  // disposal and calls getContextAttributes() on a lost context → crash.
  reactStrictMode: false,
}

export default nextConfig
