/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F5F7FF",
          100: "#E4E9FF",
          200: "#D1DDFF",
          300: "#A2B6FF",
          400: "#729AFF",
          500: "#007AFF",
          600: "#0066D6",
          700: "#0055B3",
          800: "#004490",
          900: "#00336D",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        success: "#34C759",
        warning: "#FF9500",
        danger: "#FF3B30",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 0 20px rgba(0, 0, 0, 0.05)",
        medium: "0 10px 20px rgba(0, 0, 0, 0.1)",
        strong: "0 14px 28px rgba(0, 0, 0, 0.15)",
        inner: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "gradient-soft":
          "linear-gradient(180deg, rgba(250, 250, 250, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)",
        "gradient-glass":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
      },
    },
  },
  plugins: [],
};
