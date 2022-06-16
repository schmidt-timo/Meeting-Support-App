/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "mobile": "345px",
      "mobileXL": "375px",
    },
    minWidth: {
      xs: "4rem",
      sm: "6rem",
    },
    maxWidth: {
      xl: "12rem",
    },
  },
  plugins: [],
};
