/** @type {import('tailwindcss').Config} */
const colors = require('./src/styles/colors'); // Adjust the path here

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this matches your project structure
  ],
  theme: {
    extend: {
      colors: {
        // You can extend or add your custom colors here
        custom: colors.Solid.Basic.Blue, // Use the imported colors
      },
    },
  },
  plugins: [],
};
