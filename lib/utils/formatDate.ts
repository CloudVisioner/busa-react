import { format } from 'date-fns'

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd MMMM yyyy')
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), 'dd MMM yyyy')
}

export function isUpcoming(date: string | Date): boolean {
  return new Date(date) > new Date()
}