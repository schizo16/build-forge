import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "forge": {
          bg: "#0A0A0A",
          surface: "#1A1A1A",
          hover: "#2A2A2A",
          border: "#2A2A2A",
          text: "#E2E8F0",
          muted: "#78716C",
        },
        "accent": {
          gold: "#D4AF37",
          amber: "#F59E0B",
          neon: "#EAB308",
          green: "#22C55E",
          red: "#DC2626",
          purple: "#A78BFA",
        },
      },
    },
  },
  plugins: [],
}
export default config
