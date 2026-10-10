/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Compression ──────────────────────────────────────────────────────────
  compress: true,

  // ─── Image optimisation ───────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    // Serve at exactly the sizes our breakpoints need — no wasted bytes
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [24, 48, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [{ source: '/team', destination: '/teams', permanent: true }]
  },

  // ─── HTTP headers ─────────────────────────────────────────────────────────
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Immutable long-lived cache for Next.js static chunks
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Long-lived cache for public images / fonts
      {
        source: '/:path(.*\.(?:webp|avif|jpg|jpeg|png|gif|svg|woff|woff2|ttf|otf|ico))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, stale-while-revalidate=86400' },
        ],
      },
    ]
  },
}

export default nextConfig
