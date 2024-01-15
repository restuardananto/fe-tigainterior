/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        utama: "#303670",
        kedua: "#FFB30D",
        aksen: "#F9F871",
        putih: "#FFFFFF",
        abuabu: "#E8EAFF",
        hitam: "#000000",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
