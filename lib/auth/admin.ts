export const ADMIN_SESSION_COOKIE = 'busa_admin_session'
export const ADMIN_TOKEN_COOKIE = 'busa_admin_token'
export const ADMIN_ROLE_COOKIE = 'busa_admin_role'

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN'

const DEFAULT_ADMIN_EMAIL = 'admin@busa.uz'
const DEFAULT_ADMIN_PASSWORD = 'BusaAdmin2025'
const LEGACY_ADMIN_EMAIL = 'administrator@busa.uz'
const LEGACY_ADMIN_PASSWORD = 'admin123'
const DEFAULT_ADMIN_ROLE: AdminRole = 'SUPER_ADMIN'
const DEFAULT_SESSION_VALUE = 'active'

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).trim().toLowerCase()
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD
}

export function getAdminRole(): AdminRole {
  const role = process.env.ADMIN_ROLE
  return isValidAdminRole(role) ? role : DEFAULT_ADMIN_ROLE
}

export function getAdminSessionValue(): string {
  return process.env.ADMIN_SESSION_VALUE ?? DEFAULT_SESSION_VALUE
}

export function isValidAdminCredentials(email: string, password: string): boolean {
  const normalizedEmail = email.trim().toLowerCase()
  const envCredentialsMatch = normalizedEmail === getAdminEmail() && password === getAdminPassword()
  const legacyCredentialsMatch = normalizedEmail === LEGACY_ADMIN_EMAIL && password === LEGACY_ADMIN_PASSWORD
  return envCredentialsMatch || legacyCredentialsMatch
}

export function isAdminSessionValue(value: string | undefined): boolean {
  return value === getAdminSessionValue()
}

export function isValidAdminRole(value: string | undefined): value is AdminRole {
  return value === 'SUPER_ADMIN' || value === 'ADMIN'
}

export function getDefaultDashboardForRole(role: AdminRole): string {
  return role === 'SUPER_ADMIN' ? '/admin/dashboard' : '/mentor/dashboard'
}
