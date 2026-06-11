import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FBF7F0",
          100: "#F3E8D8",
          500: "#A98255",
          700: "#6F5438",
          900: "#3A2A1C",
          950: "#1F1812"
        },
        sage: {
          100: "#E8F0EA",
          700: "#51715E"
        }
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "system-ui", "sans-serif"],
        latin: ["var(--font-latin)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(31, 24, 18, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
