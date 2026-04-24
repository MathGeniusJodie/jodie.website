export {};
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { marked } = require('marked');
const { JSDOM } = jsdom;

const postsDir = 'posts';
const outputFile = 'index2.html';

// --- frontmatter parser ---
function parseFrontmatter(content: string): { date: string; categories: string[]; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { date: '', categories: [], body: content };
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key) meta[key.trim()] = rest.join(':').trim();
  }
  const categoriesRaw = meta.categories?.replace(/^\[|\]$/g, '') ?? '';
  const categories = categoriesRaw ? categoriesRaw.split(',').map((s: string) => s.trim()) : [];
  return { date: meta.date ?? '', categories, body: match[2] };
}

// --- date formatter: "2026-04-01" → "April 1<sup>st</sup>, 2026" ---
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function ordinal(n: number): string {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return s[(v - 20) % 10] ?? s[v] ?? s[0];
}
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const day = d;
  return `${MONTHS[m - 1]} ${day}<sup>${ordinal(day)}</sup>, ${y}`;
}

// --- markdown → HTML, preserving raw HTML blocks through blank lines ---
// marked terminates HTML blocks at blank lines (CommonMark spec). We extract
// top-level HTML blocks first, replace them with placeholders, run marked on
// the rest, then restore the originals.
const HTML_BLOCK_TAGS = new Set(['ul','ol','div','details','pre','style','script','math','iframe','figure','form','table','blockquote','section','header','footer','nav','aside']);

function mdToHtml(md: string): string {
  const blocks: string[] = [];
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const tagMatch = line.trimStart().match(/^<(\w+)[\s\/>]/);
    if (tagMatch && HTML_BLOCK_TAGS.has(tagMatch[1])) {
      const tag = tagMatch[1];
      const openRe = new RegExp(`<${tag}[\\s>]`, 'g');
      const closeRe = new RegExp(`</${tag}>`, 'g');
      let depth = 0;
      const block: string[] = [];
      do {
        if (i >= lines.length) break;
        const l = lines[i];
        depth += (l.match(openRe) || []).length;
        depth -= (l.match(closeRe) || []).length;
        block.push(l);
        i++;
      } while (depth > 0);
      const idx = blocks.length;
      blocks.push(block.join('\n'));
      out.push(`\x00BLOCK${idx}\x00`);
    } else {
      out.push(line);
      i++;
    }
  }

  let html = marked(out.join('\n')) as string;
  for (let j = 0; j < blocks.length; j++) {
    html = html.replace(`<p>\x00BLOCK${j}\x00</p>`, blocks[j]);
    html = html.replace(`\x00BLOCK${j}\x00`, blocks[j]);
  }
  return html;
}

// --- load template, strip articles ---
const templateHtml = fs.readFileSync('template.html', 'utf8');
const dom = new JSDOM(templateHtml);
const document = dom.window.document;
for (const el of Array.from(document.querySelectorAll('main > article') as any)) {
  (el as any).remove();
}

// --- read and sort posts ---
const posts = fs.readdirSync(postsDir)
  .filter((f: string) => f.endsWith('.md'))
  .map((filename: string) => {
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
    const { date, categories, body } = parseFrontmatter(raw);
    return { id: filename.replace(/\.md$/, ''), date, categories, body };
  })
  .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

// --- inject articles into main ---
const main = document.querySelector('main');
for (const post of posts) {
  const article = document.createElement('article');
  article.id = post.id;
  article.className = post.categories.join(' ');

  const timeEl = document.createElement('time');
  timeEl.setAttribute('datetime', post.date);
  timeEl.innerHTML = formatDate(post.date);

  article.appendChild(timeEl);
  article.insertAdjacentHTML('beforeend', '\n' + mdToHtml(post.body));
  main.appendChild(article);
}

fs.writeFileSync(outputFile, dom.serialize());
console.log(`Built ${outputFile} with ${posts.length} posts`);
