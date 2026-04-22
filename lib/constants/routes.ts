export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EVENTS: '/events',
  PROJECTS: '/projects',
  GALLERY: '/gallery',
  VISA: '/visa',
  GUIDE: '/guide',
  ARRIVE: '/arrive',
  MY_SITUATION: '/my-situation',
  ADMIN: '/admin',
} as const

// THE TRUTH:
// Never hardcode "/events" in 20 places.
// Write it once in routes.ts.
// Change it once, updates everywhere.