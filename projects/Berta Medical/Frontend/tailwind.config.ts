import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      transitionDuration: {
        '1200': '1200ms',
        '1400': '1400ms',
        '1600': '1600ms',
        '1800': '1800ms',
        '2000': '2000ms',
      },
      height: {
        '18' : '4.5rem',
        '1000': '1000px',
        '1200': '1200px',
        '1400': '1400px',
        '1600': '1600px',
        '1800': '1800px',
        '2000': '2000px',
        '10000': '10000px',
        '20000': '20000px',
      },
      fontSize: {
        '10xl': '10rem',
        '20xl': '20rem',
        '30xl': '30rem',
        '40xl': '40rem',
        '50xl': '50rem',
      },
    },
  },
  plugins: [],
};
export default config;
