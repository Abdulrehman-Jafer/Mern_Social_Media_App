/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#F7C8E0",
        second: "#DFFFD8",
        third: "#B4E4FF",
        fourth: "#95BDFF",
        pickedColor:"#262626"
      },
    },
  },
  plugins: [],
};
