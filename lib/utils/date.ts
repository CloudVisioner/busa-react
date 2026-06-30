export function formatTableDate(input: string | null | undefined): {
  label: string
  invalid: boolean
} {
  if (!input) return { label: '-', invalid: true }
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return { label: input, invalid: true }

  return {
    label: date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    invalid: false,
  }
}
