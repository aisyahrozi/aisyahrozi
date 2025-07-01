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

    // Add a collection for all tags
    eleventyConfig.addCollection("allTags", function(collectionApi) {
        const tags = new Set();

    // Get all posts and extract tags
    collectionApi.getAll().forEach((item) => {
        if ("tags" in item.data) {
            item.data.tags
                .filter((tag) => tag !== "blog" && tag !== "pages")  // Optional: Exclude certain tags like 'blog'
                .forEach((tag) => tags.add(tag));
                }
            });

            return [...tags];
        });

    

    // Generate a collection of posts grouped by tags
    eleventyConfig.addCollection("tagsWithPosts", function(collectionApi) {
        const tagMap = {};

        collectionApi.getAll().forEach((item) => {
            if ("tags" in item.data) {
                item.data.tags.forEach((tag) => {
                    if (!tagMap[tag]) {
                        tagMap[tag] = [];
                    }
                    tagMap[tag].push(item);
                });
            }
        });

        return tagMap;
    });


    // excerp filter
    eleventyConfig.addFilter("excerpt", (content, length = 300) => {
        let cleanContent = content.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags
        return cleanContent.length > length ? cleanContent.slice(0, length) + "..." : cleanContent;
    });
   
    return{
        dir: {
            input: "src",
            includes: "_includes",
            output: "public",
        },
    };
   
};