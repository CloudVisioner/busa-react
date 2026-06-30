const extraImageHosts =
  process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS?.split(',')
    .map((h) => h.trim())
    .filter(Boolean) ?? []

const allowAnyHttpsRemote = process.env.NEXT_PUBLIC_IMAGE_ALLOW_ANY_REMOTE === 'true'

const nextConfig = {
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lqglelzzmnmbwtkgdiro.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '*.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'test.com',
      },
      ...extraImageHosts.map((hostname) => ({
        protocol: 'https' as const,
        hostname,
      })),
      ...(allowAnyHttpsRemote
        ? ([{ protocol: 'https' as const, hostname: '**' as const }] as const)
        : []),
    ],
  },
}

export default nextConfig