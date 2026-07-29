/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          light: "var(--brand-light)",
          accent: "var(--brand-accent)",
        },
        star: {
          DEFAULT: "var(--star)",
          deep: "var(--star-deep)",
        },
      },
    },
  },
  plugins: [],
};
