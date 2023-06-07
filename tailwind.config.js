/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{js, jsx, ts, tsx, html}"],
  theme: {
    extend: {
      fontFamily: {
        'PaletteMosaic': ['"Palette Mosaic"', 'cursive']
      },
    },
  },
  plugins: [],
}
