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
          300: "#F0D48A",
          400: "#E3B94D",
          500: "#D4A72C",
          600: "#B8860F",
          700: "#8C6508",
        },
        emerald: {
          300: "#7EE0B8",
          400: "#2FBE87",
          500: "#16A673",
          600: "#0E8259",
          900: "#0B4D3A",
        },
        hibiscus: {
          300: "#FF9EBB",
          400: "#FF6B96",
          500: "#F0356E",
          600: "#C41F56",
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
          purple: "#16A673",
          "purple-dark": "#0E8259",
          pink: "#F0356E",
          "pink-bright": "#FF6B96",
          blue: "#3AB0E0",
          "blue-bright": "#6BC7EA",
          amber: "#D4A72C",
          gold: "#D4A72C",
          green: "#2FBE87",
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
        "glow-gold": "0 0 20px rgba(212, 167, 44, 0.45), 0 0 40px rgba(212, 167, 44, 0.2)",
        "glow-emerald": "0 0 20px rgba(22, 166, 115, 0.45), 0 0 40px rgba(22, 166, 115, 0.2)",
        "glow-hibiscus": "0 0 20px rgba(240, 53, 110, 0.45), 0 0 40px rgba(240, 53, 110, 0.2)",
        "card-hover": "0 8px 32px rgba(212, 167, 44, 0.2)",
        "card-glow": "0 0 40px rgba(212, 167, 44, 0.15)",
        // Compat aliases for pre-redesign code, mirrors the `neon.*` color map above.
        "neon-purple": "0 0 20px rgba(22, 166, 115, 0.45), 0 0 40px rgba(22, 166, 115, 0.2)",
        "neon-pink": "0 0 20px rgba(240, 53, 110, 0.45), 0 0 40px rgba(240, 53, 110, 0.2)",
        "neon-amber": "0 0 20px rgba(212, 167, 44, 0.45), 0 0 40px rgba(212, 167, 44, 0.2)",
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
