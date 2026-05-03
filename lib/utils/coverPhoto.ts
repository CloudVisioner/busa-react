/**
 * True when the value is safe to pass to next/image (non-empty, not known-broken dummy paths like /test.jpg).
 */
export function isRenderableCoverPhoto(url: string | null | undefined): boolean {
  const trimmed = url?.trim()
  if (!trimmed) return false
  return !trimmed.toLowerCase().startsWith('/test')
}
