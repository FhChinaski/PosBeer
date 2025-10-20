import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#3B82F6",
        accent: "#93C5FD",
      },
    },
  },
  plugins: [],
};
export default config;
