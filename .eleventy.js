const sass = require("sass");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    // Pass through font files
    eleventyConfig.addPassthroughCopy({
        "node_modules/@mdi/font/fonts": "assets/fonts"
    });

    eleventyConfig.on("beforeBuild", () => {
        const outputDir = path.join(__dirname, "dist/assets/css");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const result = sass.renderSync({
            file: path.join(__dirname, "src/assets/sass/styles.scss")
        });

        fs.writeFileSync(path.join(outputDir, "styles.css"), result.css);
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        }
    };
};
