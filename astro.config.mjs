import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { siteConfig } from "./src/config/site.config.ts";

// Static output — deploys straight to Cloudflare Pages, no adapter needed
// unless/until a Pages Function (e.g. a form endpoint) is added under /functions.
export default defineConfig({
  site: siteConfig.url,
  integrations: [sitemap()],
});
