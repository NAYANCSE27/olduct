/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3333",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
