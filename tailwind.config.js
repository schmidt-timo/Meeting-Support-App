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
        nav: "10rem",
        xl: "12rem",
        "2xl": "22rem",
        80: "80rem",
        buttons: "400px",
        desktop: "600px",
        desktopLG: "800px",
      },
      minHeight: {
        agenda: "6.5rem",
        150: "150px",
        300: "300px",
      },
      maxHeight: {
        agenda: "10rem",
        question: "7.5rem",
        questions: "calc(100vh - 484px - 5rem)",
        video: "20rem",
      },
      width: {
        desktop: "600px",
      },
      height: {
        input: "2.5rem",
        page: "calc(100vh - 8rem)",
        subpage: "calc(100vh - 4.5rem)",
        meetingview: "calc(100vh - 4.75rem)",
        meetingviewDesktop: "calc(100vh - 5.25rem)",
        presentationDesktop: "calc(100vh - 25.45rem)",
      },
      screens: {
        mobileXS: "345px",
        mobileSM: "375px",
        mobileXL: "400px",
        mobile2XL: "420px",
        desktopXS: "600px",
        desktop: "800px",
        desktopLG: "1200px",
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
