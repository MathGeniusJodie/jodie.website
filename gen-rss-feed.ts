const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const RSS = require('rss');
const TurndownService = require('turndown');
const { JSDOM } = jsdom;

// Configuration
const config = {
  feedTitle: "Jodie's Blog",
  feedDescription: "Personal blog by Jodie covering math, poetry, web development, and life",
  feedUrl: "https://jodie.website/feed.xml", // Replace with your actual feed URL
  siteUrl: "https://jodie.website", // Replace with your actual site URL
  language: "en",
  authorName: "Jodie",
  htmlFilePath: "index.html", // Path to your HTML file
  outputPath: "feed.xml" // Where to save the RSS feed
};

// Initialize the RSS feed
const feed = new RSS({
  title: config.feedTitle,
  description: config.feedDescription,
  feed_url: config.feedUrl,
  site_url: config.siteUrl,
  language: config.language,
  pubDate: new Date(),
  ttl: 60, // Time to live in minutes
  custom_namespaces: {
    'atom': 'http://www.w3.org/2005/Atom'
  },
  custom_elements: [
    {'atom:link': {_attr: {href: config.feedUrl, rel: 'self', type: 'application/rss+xml'}}}
  ]
});

// Initialize Turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_'
});

// Customize turndown to better handle code blocks and pre elements
turndownService.addRule('pre', {
  filter: ['pre'],
  replacement: function(content, node) {
    return '```\n' + content + '\n```\n';
  }
});

// Read the HTML file
fs.readFile(path.resolve(config.htmlFilePath), 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the HTML file: ${err}`);
    return;
  }

  // Parse the HTML
  const dom = new JSDOM(data);
  const document = dom.window.document;
  
  // Get all blog posts
  const articles: HTMLElement[] = Array.from(document.querySelectorAll('article'));
  
  // Process each article
  articles.forEach(article => {
    const id = article.id;
    const category = Array.from(article.classList)[0]; // Get the first class as category
    const timeElement = article.querySelector('time');
    const dateStr = timeElement ? timeElement.getAttribute('datetime') : null;
    const titleElement = article.querySelector('h3');
    const title = titleElement ? titleElement.textContent : 'Untitled';
    
    // Create a document fragment to hold content elements
    const contentContainer = document.createElement('div');
    
    // Clone all content elements into the container
    const contentElements = article.querySelectorAll("*:not(h3):not(time)");
    contentElements.forEach(element => {
      contentContainer.appendChild(element.cloneNode(true));
    });
    
    // Convert HTML content to Markdown
    const htmlContent = contentContainer.innerHTML;
    const markdownContent = turndownService.turndown(htmlContent);
    
    // Create a permalink URL
    const permalink = `${config.siteUrl}#${id}`;
    
    // Add the item to the RSS feed
    feed.item({
      title: title,
      description: markdownContent,
      url: permalink,
      guid: id,
      categories: [category],
      author: config.authorName,
      date: dateStr || new Date()
    });
  });

  // Generate the XML
  const xml = feed.xml({indent: true});

  // Write the RSS feed to a file
  fs.writeFile(path.resolve(config.outputPath), xml, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing the RSS feed: ${err}`);
      return;
    }
    console.log(`RSS feed successfully generated at ${config.outputPath}`);
    console.log(`Converted ${articles.length} articles to Markdown format`);
  });
});