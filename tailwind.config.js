const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './src/components/**/*.{vue,js}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js}',
    './nuxt.config.{js}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display-1': 'calc(1.725rem + 5.7vw)',
        'display-2': 'calc(1.675rem + 5.1vw)',
        'display-3': 'calc(1.575rem + 3.9vw)',
        'display-4': 'calc(1.475rem + 2.7vw)',
        h1: 'calc(1.375rem + 1.5vw)',
        h2: 'calc(1.325rem + 0.9vw)',
        h3: 'calc(1.3rem + 0.6vw)',
        h4: 'calc(1.275rem + 0.3vw)',
      },
      colors: {},
      translate: {
        '-1/5': '-20%',
        '1/5': '20%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        '.display-1': { fontSize: config('theme.fontSize.display-1') },
        '.display-2': { fontSize: config('theme.fontSize.display-2') },
        '.display-3': { fontSize: config('theme.fontSize.display-3') },
        '.display-4': { fontSize: config('theme.fontSize.display-4') },
        h1: { fontSize: config('theme.fontSize.h1') },
        h2: { fontSize: config('theme.fontSize.h2') },
        h3: { fontSize: config('theme.fontSize.h3') },
        h4: { fontSize: config('theme.fontSize.h4') },
      })
    }),
  ],
}
