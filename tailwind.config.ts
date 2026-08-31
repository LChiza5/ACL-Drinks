import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          300: "#FFE29A",
          400: "#FFC94D",
          500: "#F2A900",
          600: "#C98700",
          700: "#9C6D00",
        },
        emerald: {
          300: "#8FE8A8",
          400: "#4CD671",
          500: "#22B14C",
          600: "#178A38",
          900: "#0B4D24",
        },
        hibiscus: {
          300: "#FFACC9",
          400: "#FF75AC",
          500: "#FF3D8A",
          600: "#D41C69",
        },
        brand: {
          deep: "#0F0D0B",
          dark: "#12110F",
          mid: "#1E1A17",
          wine: "#2A1F14",
        },
        // Compat layer: pre-redesign code (dashboard, checkout, cart, shadcn
        // primitives) references these `neon-*` utility names throughout.
        // Mapped onto the new palette so that code keeps its original color
        // *role* (purple = primary accent, amber = secondary, pink = tertiary,
        // blue = quaternary, green = success) without a site-wide rename.
        neon: {
          purple: "#22B14C",
          "purple-dark": "#178A38",
          pink: "#FF3D8A",
          "pink-bright": "#FF75AC",
          blue: "#3AB0E0",
          "blue-bright": "#6BC7EA",
          amber: "#F2A900",
          gold: "#F2A900",
          green: "#4CD671",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-in",
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "bounce-subtle": "bounce-subtle 1.5s ease-in-out infinite",
      },
      boxShadow: {
        "glow-gold": "0 0 20px rgba(242, 169, 0, 0.5), 0 0 40px rgba(242, 169, 0, 0.25)",
        "glow-emerald": "0 0 20px rgba(34, 177, 76, 0.5), 0 0 40px rgba(34, 177, 76, 0.25)",
        "glow-hibiscus": "0 0 20px rgba(255, 61, 138, 0.5), 0 0 40px rgba(255, 61, 138, 0.25)",
        "card-hover": "0 8px 32px rgba(242, 169, 0, 0.2)",
        "card-glow": "0 0 40px rgba(242, 169, 0, 0.15)",
        // Compat aliases for pre-redesign code, mirrors the `neon.*` color map above.
        "neon-purple": "0 0 20px rgba(34, 177, 76, 0.5), 0 0 40px rgba(34, 177, 76, 0.25)",
        "neon-pink": "0 0 20px rgba(255, 61, 138, 0.5), 0 0 40px rgba(255, 61, 138, 0.25)",
        "neon-amber": "0 0 20px rgba(242, 169, 0, 0.5), 0 0 40px rgba(242, 169, 0, 0.25)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
