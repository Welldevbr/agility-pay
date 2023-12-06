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
        purple: {
          normal: "#8B25E2",
          hover: "#5C1499",
        },
        base: "#09080C",
        dark: "#1C1924",
        darkAlt: "#131118",
        zinc: "#2F2A3C",
        light: "#A6A0BB",
      },
    },
  },
  plugins: [],
};
export default config;
