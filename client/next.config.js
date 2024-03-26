import path from "path";

// Determine the directory path of the current module file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../..'),
  },
};

export default config;
