const { DateTime } = require("luxon");
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function (eleventyConfig){

    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css");
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addWatchTarget("./src/assets");
    eleventyConfig.addPlugin(readingTime);

    //Date Clean up
    eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    // excerp filter
    eleventyConfig.addFilter("excerpt", (content, length = 150) => {
        let cleanContent = content.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags
        return cleanContent.length > length ? cleanContent.slice(0, length) + "..." : cleanContent;
    });

    return{
        dir: {
            input: "src",
            output: "public",
        },
    };
};