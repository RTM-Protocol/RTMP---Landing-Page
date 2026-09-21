import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          secondary: "#1A1A1A",
          tertiary: "#2D2D2D",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#CCCCCC",
          muted: "#777777",
        },
        accent: {
          orange: "#D4662F",
          "orange-hover": "#B8551F",
          emergency: "#E74C3C",
          green: "#27AE60",
        },
        border: {
          subtle: "#2A2A2A",
        },
        protocol: {
          pv: "#C0392B",
          so: "#D4962F",
          er: "#27AE60",
          rc: "#3498DB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      maxWidth: {
        content: "1080px",
        story: "640px",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
