// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        arial: ['"Arial"', "sans-serif"],
        courier: ['"Courier Prime"', "monospace"],
        times: ['"Times New Roman"', "serif"],
        georgia: ['"Georgia"', "serif"],
        verdana: ['"Verdana"', "sans-serif"],
        tahoma: ['"Tahoma"', "sans-serif"],
        trebuchet: ['"Trebuchet MS"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
