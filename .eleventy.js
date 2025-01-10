const { DateTime } = require("luxon");
const readingTime = require('eleventy-plugin-reading-time');
// setup markdown to use emoji plugin
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji").full; // Or .bare / .light

module.exports = function (eleventyConfig){

    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css");
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addWatchTarget("./src/assets");
    eleventyConfig.addPlugin(readingTime);
    eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItEmoji));

    //Date Clean up
    eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    // excerp filter
    eleventyConfig.addFilter("excerpt", (content, length = 300) => {
        let cleanContent = content.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags
        return cleanContent.length > length ? cleanContent.slice(0, length) + "..." : cleanContent;
    });

    // setup markdown to use emoji plugin
    

    return{
        dir: {
            input: "src",
            output: "public",
        },
    };
   
};