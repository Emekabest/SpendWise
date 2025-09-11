/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["_layout.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        "monasans-bold":["MonoSans-Bold"],
        "monasans-regular":["MonoSans-Regular"],
        "monasans-light":["MonoSans-Light"],

      }
    },  },
  plugins: [],
}