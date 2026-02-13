import path from "node:path";

/** @param {import("webpack").Configuration} config */
export function webpack(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "@lib": path.resolve("src/lib"),
    "@text": path.resolve("src/text"),
    "@trials": path.resolve("src/trials"),
    "@instructions": path.resolve("src/instructions"),
    "@settings": path.resolve("src/settings.ts"),
    "@runtimeState": path.resolve("src/runtimeState.ts"),
    "@jsp": path.resolve("src/jsp.ts"),
    "@styles": path.resolve("styles"),
  };

  return config;
}
