// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ai.jscebu.org",
  integrations: [
    tailwind(),
    sitemap({
      changefreq: "weekly",
      priority: 0.9,
    }),
  ],
  output: "server",
  adapter: cloudflare(),
});
