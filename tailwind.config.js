/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        18: "4.5rem",
      },
      minWidth: {
        xs: "4rem",
        sm: "6rem",
      },
      maxWidth: {
        lg: "8rem",
        xl: "12rem",
        80: "80rem",
      },
      minHeight: {
        agenda: "6.5rem",
        150: "150px",
        300: "300px",
      },
      maxHeight: {
        agenda: "10rem",
        question: "7.5rem",
      },
      height: {
        input: "2.5rem",
        meetingview: "calc(100vh - 4.75rem)",
      },
      screens: {
        mobileXS: "345px",
        mobileSM: "375px",
        mobileXL: "400px",
        mobile2XL: "420px",
      },
      fontSize: {
        extrasmall: "0.7rem",
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
    outline: ["focus"],
  },
  plugins: [],
};
