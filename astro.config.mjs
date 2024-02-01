import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import purgecss from "astro-purgecss";

import { astroImageTools } from "astro-imagetools";

import deploymentConfigs from "./config";
import sitemap from "@astrojs/sitemap";
const {
  org,
  env,
  s3Key,
  s3Bucket
} = deploymentConfigs;
const dev = import.meta.env.DEV;
const siteUrl = org === "wbez" ? s3Bucket : env === "stage" ? "graphics-stage.suntimes.com" : "graphics.suntimes.com";


// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [svelte(), purgecss(), astroImageTools, sitemap()],
  experimental: {
    assets: true
  },
  compressHTML: true,
  base: dev ? "" : `/${s3Key}`,
  site: `https://${siteUrl}`
});