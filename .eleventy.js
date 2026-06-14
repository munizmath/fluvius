module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ "site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });

  eleventyConfig.addFilter("absoluteUrl", function(path, site) {
    const base = (site && site.baseUrl ? site.baseUrl : "").replace(/\/$/, "");
    if (!path) return base + "/";
    if (/^https?:\/\//.test(path)) return path;
    return base + "/" + String(path).replace(/^\//, "");
  });

  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value, null, 2);
  });

  eleventyConfig.addFilter("findSector", function(sectors, id) {
    return Array.isArray(sectors) ? sectors.find((sector) => sector.id === id) : null;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};
