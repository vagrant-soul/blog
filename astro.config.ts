import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
// import mocha from "@catppuccin/vscode/themes/mocha.json" with { type: "json" };
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), sitemap(), expressiveCode(
    {
      
      // Pass the theme to the `themes` option
      // (consider adding a dark and light theme for accessibility)
      themes: ['catppuccin-mocha'],
    }
  )],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      summary: "显示目录",
      test: "Table of contents"
    }]],
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  scopedStyleStrategy: "where"
});