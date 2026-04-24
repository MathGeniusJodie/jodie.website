export {};
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { marked } = require('marked');
const { JSDOM } = jsdom;

const postsDir = 'posts';
const subpostsDir = 'subposts';
const outputFile = 'index.html';

// --- frontmatter parser ---
function parseFrontmatter(content: string): { date: string; categories: string[]; parent: string; hidden: boolean; href: string; source: string; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { date: '', categories: [], parent: '', hidden: false, href: '', source: '', body: content };
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key) meta[key.trim()] = rest.join(':').trim();
  }
  const categoriesRaw = meta.categories?.replace(/^\[|\]$/g, '') ?? '';
  const categories = categoriesRaw ? categoriesRaw.split(',').map((s: string) => s.trim()) : [];
  return {
    date: meta.date ?? '',
    categories,
    parent: meta.parent ?? '',
    hidden: meta.hidden === 'true',
    href: meta.href ?? '',
    source: meta.source ?? '',
    body: match[2],
  };
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
  return `${MONTHS[m - 1]} ${d}<sup>${ordinal(d)}</sup>, ${y}`;
}
function formatDayMonth(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}<sup>${ordinal(d)}</sup>`;
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

// --- subpost → linklist item HTML ---
function renderSubpostItem(sub: any): string {
  const label = formatDayMonth(sub.date);
  const titleHtml = marked.parseInline(sub.title) as string;

  if (sub.href) {
    const source = sub.source ? ` - ${sub.source}` : '';
    const item = `<li>${label} - <strong><a href="${sub.href}" target="_blank">${titleHtml}</a></strong>${source}</li>`;
    return sub.hidden ? `<li hidden="">${item.slice(4)}` : item;
  }

  const body = mdToHtml(sub.body.replace(/^##[^\n]*\n/, ''));
  const inner = `<details>\n      <summary>${label} - <strong>${titleHtml}</strong></summary>\n      <article>\n        <h2>${titleHtml}</h2>\n${body}      </article>\n    </details>`;
  return sub.hidden ? `<li hidden="">${inner}</li>` : `<li>${inner}</li>`;
}

// --- load subposts for a given parent id ---
function loadSubposts(parentId: string): any[] {
  if (!fs.existsSync(subpostsDir)) return [];
  return fs.readdirSync(subpostsDir)
    .filter((f: string) => f.endsWith('.md'))
    .map((filename: string) => {
      const raw = fs.readFileSync(path.join(subpostsDir, filename), 'utf8');
      const { date, parent, hidden, href, source, body } = parseFrontmatter(raw);
      if (parent !== parentId) return null;
      const titleMatch = body.match(/^##\s+(.+)/m);
      const title = titleMatch ? titleMatch[1].trim() : filename.replace(/\.md$/, '');
      return { date, hidden, href, source, body, title };
    })
    .filter((s: any) => s !== null)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// --- add target="_blank" to external links ---
function addExternalLinkTargets(html: string): string {
  const d = new JSDOM(html);
  for (const a of Array.from(d.window.document.querySelectorAll('a[href]'))) {
    const href = (a as HTMLAnchorElement).getAttribute('href') ?? '';
    if (/^https?:\/\//.test(href) && !(a as HTMLAnchorElement).hasAttribute('target')) {
      (a as HTMLAnchorElement).setAttribute('target', '_blank');
    }
  }
  return d.window.document.body.innerHTML;
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

  let html = mdToHtml(post.body);

  // inject subposts linklist if marker present
  const subposts = loadSubposts(post.id);
  if (subposts.length > 0 && html.includes('<!-- subposts -->')) {
    const items = subposts.map(renderSubpostItem).join('\n    ');
    const linklist = `<ul class="linklist">\n    ${items}\n  </ul>`;
    html = html.replace('<!-- subposts -->', linklist);
  }

  html = addExternalLinkTargets(html);

  article.insertAdjacentHTML('beforeend', '\n' + html);
  main.appendChild(article);
}

fs.writeFileSync(outputFile, dom.serialize());
console.log(`Built ${outputFile} with ${posts.length} posts`);
