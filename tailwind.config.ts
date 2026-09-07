import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        petmily: {
          teal: "#5CB8C1",
          tealLight: "#72C6CE",
          tealBg: "#EBF7F8",
          tealBorder: "#C0E6E9",
          green: "#00A877",
          greenHover: "#009166",
          greenLight: "#E8F8F3",
          dark: "#2A323D",
          grayText: "#7E8B9B",
          lightGray: "#F4F7F8",
          inputBg: "#FFFFFF",
          inputBorder: "#E5E9EC",
        },
      },
      fontFamily: {
        kanit: ["var(--font-kanit)", "sans-serif"],
        prompt: ["var(--font-prompt)", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'btn': '0 4px 14px rgba(0, 168, 119, 0.35)',
        'card': '0 4px 20px rgba(92, 184, 193, 0.15)',
        'float': '0 12px 35px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
};
export default config;
