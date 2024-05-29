require("dotenv").config({
  path: `.env.${process.env.ELEVENTY_ENV || "development"}`,
});
const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");
const shortcodes = require("./utils/shortcodes.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/assets");
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
    templateFormats: ["njk", "md", "11ty.js"],
  };
};
