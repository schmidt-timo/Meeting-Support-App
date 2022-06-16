/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-bg": "#EEE",
        "gray-btn": "#DDD",
        "gray-btn-hover": "#CCC",
      },
      screens: {
        mobileXS: "345px",
        mobileSM: "375px",
        mobileXL: "400px",
      },
      fontSize: {
        extrasmall: "0.7rem",
      },
    },
    minWidth: {
      xs: "4rem",
      sm: "6rem",
    },
    maxWidth: {
      lg: "8rem",
      xl: "12rem",
    },
  },
  plugins: [],
};
