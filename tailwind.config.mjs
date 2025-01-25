/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text)",
            "--tw-prose-headings": "var(--secondary)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-bold": "var(--secondary)",
            "--tw-prose-code": "var(--accent)",
            "--tw-prose-quotes": "var(--secondary)",
            "--tw-prose-pre-bg": "var(--secondary)",
            code: {
              backgroundColor: "var(--primary)",
              color: "var(--secondary)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "var(--secondary)",
              color: "var(--background)",
              padding: "1.25em",
              borderRadius: "0.75rem",
              margin: "1.5em 0",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "inherit",
              padding: "0",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
