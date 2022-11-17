/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { zinc: { 1000: "#0c0c0f" } },
      screens: {
        "mobile-lg": "400px",
        "mobile-md": "360px",
        "mobile-sm": "280px",
      },
    },
  },
  plugins: [],
};
