/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        '20px':'20px',
        '25px':'25px',
        '30px':'30px',
      },
    },
  },
  plugins: [],
}

