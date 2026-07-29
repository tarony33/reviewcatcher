/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          deep: "var(--brand-deep)",
          light: "var(--brand-light)",
        },
        accent: "var(--accent)",
        star: "var(--star)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        paper: {
          DEFAULT: "var(--paper)",
          2: "var(--paper-2)",
        },
        line: "var(--line)",
        pos: "var(--pos)",
      },
    },
  },
  plugins: [],
};
