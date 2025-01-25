import fs from "fs";
import sveltePreprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

const isDev = process.env.NODE_ENV === "development";

// Read routes from the generated routes.json file
let dynamicRoutes = [];
try {
  // Make sure the file path is correct
  dynamicRoutes = JSON.parse(fs.readFileSync("./routes.json", "utf-8"));
  console.log("Dynamic Routes Loaded:", dynamicRoutes); 
} catch (error) {
  console.error("Error reading routes.json:", error);
}

export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
    }),
    paths: {
      base: isDev ? "" : "/dpractice",
    },
    prerender: {
      entries: ["*", ...dynamicRoutes],
    },
  },
  preprocess: sveltePreprocess(),
};
