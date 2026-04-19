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
        soil: "#4a3728",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "base-obsidian": "hsl(216 12% 8%)",
        "brand-teal": "#00B4A6",
        forest: "hsl(var(--forest))",
        sandstone: "hsl(var(--sandstone))",
        jade: "hsl(var(--jade))",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
