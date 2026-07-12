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
        primary: {
          DEFAULT: "#5CDDFF",
          50: "#EBFAFF",
          100: "#D6F5FF",
          200: "#ADEBFF",
          300: "#85E1FF",
          400: "#71DEFF",
          500: "#5CDDFF",
          600: "#34C4EA",
          700: "#2199BD",
          800: "#14688B",
          900: "#0A3341",
        },
        secondary: {
          DEFAULT: "#FF833D",
          50: "#FFF1E8",
          100: "#FFE0CC",
          200: "#FFC199",
          300: "#FFA166",
          400: "#FF9252",
          500: "#FF833D",
          600: "#E86610",
          700: "#B04D0B",
          800: "#783408",
          900: "#401C04",
        },
        tertiary: {
          DEFAULT: "#8E5CE0",
          50: "#F4EEFC",
          100: "#E9DDFA",
          200: "#D3BBF4",
          300: "#BD99EF",
          400: "#A57AE7",
          500: "#8E5CE0",
          600: "#7440CB",
          700: "#5B2FA6",
          800: "#41217A",
          900: "#28144D",
        },
        ink: {
          DEFAULT: "#111114",
          muted: "#5A5A66",
          soft: "#8C8C97",
        },
        surface: {
          DEFAULT: "#FAFAFA",
          alt: "#FFFFFF",
          dark: "#0A0A0F",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "float-up": "floatUp 0.8s ease-out both",
        "bounce-soft": "bounceSoft 2.4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #5CDDFF 0%, #8E5CE0 45%, #FF833D 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(92,221,255,0.14) 0%, rgba(255,131,61,0.12) 100%)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(17, 17, 20, 0.12)",
        glow: "0 0 0 1px rgba(92, 221, 255, 0.22), 0 20px 60px -20px rgba(92, 221, 255, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
