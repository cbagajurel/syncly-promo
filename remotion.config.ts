import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Required for Three.js / WebGL rendering in headless Chromium.
Config.setChromiumOpenGlRenderer("angle");
