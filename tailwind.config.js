/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        button: "0.75rem",
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};