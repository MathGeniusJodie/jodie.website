const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const RSS = require('rss');
const { JSDOM } = jsdom;

const config = {
  feedTitle: "Jodie's Blog",
  feedDescription: "Personal blog by Jodie covering math, poetry, web development, and life",
  feedUrl: "https://jodie.website/feed.xml",
  siteUrl: "https://jodie.website",
  language: "en",
  authorName: "Jodie",
  htmlFilePath: "index.html",
  outputPath: "feed.xml"
};

const feed = new RSS({
  title: config.feedTitle,
  description: config.feedDescription,
  feed_url: config.feedUrl,
  site_url: config.siteUrl,
  language: config.language,
  pubDate: new Date(),
  ttl: 60,
  custom_namespaces: {
    'atom': 'http://www.w3.org/2005/Atom'
  }
});

fs.readFile(path.resolve(config.htmlFilePath), 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error(`Error reading the HTML file: ${err}`);
    return;
  }

  const dom = new JSDOM(data);
  const document = dom.window.document;

  // Only top-level articles have an id; nested ones (inside <details>) don't
  const articles: any[] = Array.from(document.querySelectorAll('article[id]'));

  articles.forEach(article => {
    const id = article.id;
    const category = Array.from(article.classList)[0];
    const timeElement = article.querySelector(':scope > time');
    const dateStr = timeElement ? timeElement.getAttribute('datetime') : null;
    const titleElement = article.querySelector(':scope > h2');
    const title = titleElement ? titleElement.textContent!.trim() : 'Untitled';

    // Clone and strip the title/time since they're represented as metadata
    const clone: any = article.cloneNode(true);
    clone.querySelector(':scope > h2')?.remove();
    clone.querySelector(':scope > time')?.remove();

    const htmlContent = clone.innerHTML.trim();
    const permalink = `${config.siteUrl}#${id}`;

    feed.item({
      title: title,
      description: htmlContent,
      url: permalink,
      guid: permalink,
      categories: [category],
      author: config.authorName,
      date: dateStr || new Date(),
      custom_elements: [
        {'content:encoded': {_cdata: htmlContent}}
      ]
    });
  });

  const xml = feed.xml({indent: true});

  fs.writeFile(path.resolve(config.outputPath), xml, 'utf8', (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.error(`Error writing the RSS feed: ${err}`);
      return;
    }
    console.log(`RSS feed successfully generated at ${config.outputPath}`);
    console.log(`Added ${articles.length} articles`);
  });
});
