/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // gridTemplateColumns: {
      //   yt: "repeat(auto-fit,mimmax(250px,1fr))",
      // },
    },
    colors: {
      "yt-black": "#0f0f0f",
      "yt-red": "#ff0300",
      "yt-white": "#f1f1f1",
      "yt-light-black": "#272727",
      "yt-light": "#181818",
      "yt-light-1": "#212121",
      "yt-gray": "gray",
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // For hiding scrollbars
    require("tailwind-scrollbar"), // For scrollbar customization
  ],
};
