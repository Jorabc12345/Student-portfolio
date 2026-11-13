import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF669B",
        butter: "#F9E7A2",
        ink: "#2D2430",
      },
    },
  },
  plugins: [],
} satisfies Config;
