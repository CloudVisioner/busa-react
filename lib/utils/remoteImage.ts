/** Must use a host allowed in `next.config` `images.remotePatterns`. */
export const FALLBACK_REMOTE_IMAGE =
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=60'

export function normalizeRemoteImageUrl(url: unknown): string {
  if (typeof url !== 'string') return FALLBACK_REMOTE_IMAGE
  const trimmed = url.trim()
  if (!trimmed) return FALLBACK_REMOTE_IMAGE
  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return FALLBACK_REMOTE_IMAGE
    return trimmed
  } catch {
    return FALLBACK_REMOTE_IMAGE
  }
}
