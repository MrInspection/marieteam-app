/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
      },
      colors: {
        brand: {
          "25": "#F8F9FD",
          "50": "#F0F4FA",
          "100": "#E1E9F6",
          "200": "#C3D3ED",
          "300": "#A5BDE4",
          "400": "#87A7DB",
          "500": "#6991D2",
          "600": "#4B76C9",
          "700": "#3659B1",
          "800": "#284189",
          "900": "#1B2A61",
          "950": "#111A3E",
        },
      }
    },
  },
  plugins: [],
};