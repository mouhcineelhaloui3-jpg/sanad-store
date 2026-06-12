import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00E5FF",
          green: "#00FF95",
          gold: "#FFB800"
        },
        dark: {
          DEFAULT: "#0A0A0A",
          50: "#141414",
          100: "#1A1A1A",
          200: "#222222",
          300: "#2A2A2A",
          400: "#333333",
          500: "#444444",
          600: "#666666",
          700: "#888888",
          800: "#AAAAAA",
          900: "#CCCCCC"
        }
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "system-ui", "sans-serif"],
        latin: ["var(--font-latin)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.4)",
        glow: "0 0 40px rgba(0, 229, 255, 0.25)",
        "glow-green": "0 0 40px rgba(0, 255, 149, 0.25)",
        "glow-gold": "0 0 40px rgba(255, 184, 0, 0.25)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)"
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        float: "float 4s ease-in-out infinite",
        pulse_neon: "pulseNeon 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "slide-up": "slideUp 0.5s ease-out both",
        marquee: "marquee 35s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        "divider-shine": "dividerShine 3s ease-in-out infinite",
        "aurora-1": "auroraDrift1 14s ease-in-out infinite alternate",
        "orb-float": "orbFloat1 16s ease-in-out infinite"
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseNeon: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)" },
          "50%": { opacity: "0.85", boxShadow: "0 0 40px rgba(0, 229, 255, 0.6)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        dividerShine: {
          "0%, 100%": { opacity: "0", transform: "translateX(-100%)" },
          "50%": { opacity: "1", transform: "translateX(100%)" }
        },
        auroraDrift1: {
          "0%": { transform: "translate(-5%, -3%) rotate(-2deg) scale(1)" },
          "100%": { transform: "translate(8%, 6%) rotate(3deg) scale(1.08)" }
        },
        auroraDrift2: {
          "0%": { transform: "translate(6%, 4%) rotate(2deg) scale(1.05)" },
          "100%": { transform: "translate(-8%, -5%) rotate(-3deg) scale(1)" }
        },
        auroraDrift3: {
          "0%": { transform: "translate(-4%, 8%) scale(1)" },
          "100%": { transform: "translate(5%, -6%) scale(1.1)" }
        },
        conicSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        orbFloat1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -30px) scale(1.08)" },
          "66%": { transform: "translate(-25px, 35px) scale(0.95)" }
        },
        orbFloat2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-50px, 40px) scale(1.12)" }
        },
        orbFloat3: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(35px, -45px)" }
        },
        orbFloat4: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%": { transform: "translate(-30px, 25px) scale(1.06)" },
          "80%": { transform: "translate(20px, -20px) scale(0.94)" }
        },
        orbFloat5: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-40px, -30px)" }
        },
        gridPulse: {
          "0%": { opacity: "0.25" },
          "100%": { opacity: "0.45" }
        },
        beamSweep1: {
          "0%, 100%": { transform: "rotate(-8deg) translateX(0)", opacity: "0.2" },
          "50%": { transform: "rotate(12deg) translateX(30px)", opacity: "0.45" }
        },
        beamSweep2: {
          "0%, 100%": { transform: "rotate(10deg) translateX(0)", opacity: "0.15" },
          "50%": { transform: "rotate(-14deg) translateX(-25px)", opacity: "0.4" }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
};

export default config;
