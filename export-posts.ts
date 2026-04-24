const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const TurndownService = require('turndown');
const { JSDOM } = jsdom;

const htmlFilePath = 'index.html';
const outputDir = 'posts';

// Elements that can be losslessly converted to markdown
const CONVERTIBLE_INLINE = new Set(['strong', 'b', 'em', 'i', 'a', 'code', 'br']);
const CONVERTIBLE_BLOCK = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'img', 'hr']);

// Inline elements preserved as raw HTML — no block-level wrapping needed
const RAW_INLINE = new Set(['abbr', 'sup', 'sub', 'span', 'time', 'input', 'label']);
// Block elements preserved as raw HTML — need \n\n separation
const RAW_BLOCK = new Set(['pre', 'math', 'style', 'script', 'iframe', 'details', 'summary', 'div', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'figure', 'figcaption']);

function needsRawHtml(node: any): boolean {
  const tag = node.tagName?.toLowerCase();
  if (!tag) return false;
  return RAW_INLINE.has(tag) || RAW_BLOCK.has(tag);
}

function isInlineNode(node: any): boolean {
  if (node.nodeType === 3) return true; // text node
  const tag = node.tagName?.toLowerCase();
  return CONVERTIBLE_INLINE.has(tag) || RAW_INLINE.has(tag);
}

// Check if a node or any of its descendants need raw HTML
function subtreeNeedsRawHtml(node: any): boolean {
  if (node.nodeType === 3) return false; // text node
  if (needsRawHtml(node)) return true;
  for (const child of Array.from(node.childNodes as any[])) {
    if (subtreeNeedsRawHtml(child)) return true;
  }
  return false;
}

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });

// Block raw HTML — needs paragraph separation
td.addRule('preserve-html-block', {
  filter: (node: any) => RAW_BLOCK.has(node.tagName?.toLowerCase()),
  replacement: (_: string, node: any) => '\n\n' + node.outerHTML + '\n\n',
});

// Inline raw HTML — no newlines, stays in flow
td.addRule('preserve-html-inline', {
  filter: (node: any) => RAW_INLINE.has(node.tagName?.toLowerCase()),
  replacement: (_: string, node: any) => node.outerHTML,
});

function nodeToMarkdown(node: any): string {
  if (subtreeNeedsRawHtml(node)) {
    return node.outerHTML;
  }
  return td.turndown(node.outerHTML).trim();
}

// Convert an element's children to markdown parts, grouping consecutive inline
// nodes so they form a single paragraph rather than separate blocks.
function childrenToMarkdown(el: any): string {
  const parts: string[] = [];
  let inlineBuf = '';

  function flushInline() {
    const t = inlineBuf.trim();
    if (t) parts.push(t);
    inlineBuf = '';
  }

  for (const child of Array.from(el.childNodes as any[])) {
    if (child.nodeType === 3) {
      // Raw text node — preserve as-is in inline buffer
      inlineBuf += child.textContent;
    } else if (child.nodeType === 1) {
      if (isInlineNode(child)) {
        inlineBuf += nodeToMarkdown(child);
      } else {
        flushInline();
        parts.push(nodeToMarkdown(child));
      }
    }
  }
  flushInline();

  return parts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

const data = fs.readFileSync(path.resolve(htmlFilePath), 'utf8');
const dom = new JSDOM(data);
const document = dom.window.document;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const articles: any[] = Array.from(document.querySelectorAll('main > article[id]'));

for (const article of articles) {
  const id = article.id;
  const category = Array.from(article.classList as any)[0] as string || '';
  const timeEl = article.querySelector(':scope > time');
  const date = timeEl ? timeEl.getAttribute('datetime') : '';

  const categories = Array.from(article.classList as any) as string[];

  const frontmatter = [
    '---',
    `date: ${date}`,
    `categories: [${categories.join(', ')}]`,
    '---',
    '',
  ].join('\n');

  // Clone and only remove time — title stays as inline markdown
  const clone = article.cloneNode(true) as any;
  clone.querySelector(':scope > time')?.remove();

  const body = childrenToMarkdown(clone);

  const filename = `${id}.md`;
  fs.writeFileSync(path.join(outputDir, filename), frontmatter + body + '\n');
  console.log(`Written: ${filename}`);
}

console.log(`\nExported ${articles.length} posts to ./${outputDir}/`);

// Export nested articles inside <details> (skip hidden ones)
const subpostsDir = 'subposts';
if (!fs.existsSync(subpostsDir)) fs.mkdirSync(subpostsDir);

const subArticles: any[] = Array.from(
  document.querySelectorAll('main > article[id] li:not([hidden]) details > article')
);

for (const article of subArticles) {
  const parentArticle = article.closest('main > article[id]');
  const categories = Array.from(parentArticle.classList as any) as string[];

  const frontmatter = [
    '---',
    `categories: [${categories.join(', ')}]`,
    `parent: ${parentArticle.id}`,
    '---',
    '',
  ].join('\n');

  const body = childrenToMarkdown(article);

  const titleEl = article.querySelector('h2');
  const title = titleEl ? titleEl.textContent.trim() : '';
  const filename = `${slugify(title) || 'untitled'}.md`;
  fs.writeFileSync(path.join(subpostsDir, filename), frontmatter + body + '\n');
  console.log(`Written subpost: ${filename}`);
}

console.log(`\nExported ${subArticles.length} subposts to ./${subpostsDir}/`);
