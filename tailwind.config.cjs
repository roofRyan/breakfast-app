/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#facc15",    // 主色 (黃色)
        secondary: "#3b82f6",  // 副色 (藍色)
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
      },
      width: {
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        56: "14rem",
        64: "16rem",
      },
      height: {
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        56: "14rem",
        64: "16rem",
      },
      flex: {
        '1': '1 1 0%',
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      gridTemplateColumns: {
        'fill-3': 'repeat(auto-fill, minmax(12rem, 1fr))',
        'fill-4': 'repeat(auto-fill, minmax(16rem, 1fr))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],  // 可切換主題
  },
};
