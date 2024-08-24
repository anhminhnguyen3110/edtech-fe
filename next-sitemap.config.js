// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.edtech-assistant.sbs', // Replace with your site's URL
  generateRobotsTxt: true, // (optional) Generate a robots.txt file
  sitemapSize: 7000, // Maximum number of URLs per sitemap file
  // Exclude specific paths if necessary
  exclude: ['/admin/*', '/login'],
}
