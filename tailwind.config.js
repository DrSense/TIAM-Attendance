/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app-tailwind.js",
    "./qr-generator.html"
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1D3A',
        'gold': '#C8A23A',
        'warm-bg': '#F6F4EF',
        'hope-green': '#4CAF50',
        'care-orange': '#FF9800',
      }
    }
  },
  plugins: []
}
