/** Stored in gallery `event` for photos not tied to a project slug. */
export const GALLERY_OTHERS_EVENT = 'boshqalar'

/** Client-only filter value (not sent to GraphQL `type`). */
export const GALLERY_OTHERS_FILTER = '__others__'

export function normalizeGalleryEvent(value: string | undefined | null): string {
  return (value ?? '').trim().toLowerCase()
}
