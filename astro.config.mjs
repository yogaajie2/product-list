// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true })],

  vite: {
    plugins: [svgr(), tailwindcss()],
  },
});
