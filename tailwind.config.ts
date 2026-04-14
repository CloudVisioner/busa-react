import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00236f',
        'primary-container': '#1e3a8a',
        'on-primary': '#ffffff',
        'on-primary-container': '#90a8ff',
        'primary-fixed-dim': '#b6c4ff',
        'on-primary-fixed-variant': '#264191',
        secondary: '#555d7e',
        surface: '#f5f5f7',
        'surface-container': '#eceef0',
        'surface-container-low': '#f2f4f6',
        'surface-container-high': '#e6e8ea',
        'surface-container-lowest': '#ffffff',
        'on-surface': '#191c1e',
        'on-surface-variant': '#444651',
        'outline-variant': '#c5c5d3',
      },
      fontFamily: {
        headline: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-roboto)', 'sans-serif'],
        label: ['var(--font-roboto)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      },
    },
  },
  darkMode: 'class',
}

export default config
