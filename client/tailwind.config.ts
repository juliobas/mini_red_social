import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black111: "#111111",
        white: {
          full: "#ffffff",
          low: "#A9A9A9",
        },
        gray: {
          base: "#1D1D1D",
          hover: "#161616",
          active: "#181A1B",
          low: "#585353",
        },
        sky: {
          base: "#67F0FF",
          hover: "#69C9D3",
          active: "#99F5FF",
          pearl: "#67FFCA",
          blue: "#80D4FF",
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        'glow-sm': '0 0 7px 2px rgba(0, 0, 0, 0.1)',
        'glow-lg': '0 0 8px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
