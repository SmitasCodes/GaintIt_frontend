/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: "#EBEAFF",
        primary: "#FF2929",
        accent: "#3D3BF3",
        secondary: "#9694FF",
      },
    },
  },
  plugins: [],
};
