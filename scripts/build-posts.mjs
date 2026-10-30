/**
 * Build script for the blog.
 *
 * Reads every posts/*.md file, parses its YAML front matter, skips drafts,
 * and writes:
 *   - posts/posts.json  (index used by blog.html)
 *   - sitemap.xml       (static pages + every published post)
 *
 * Run locally:  npm install --no-save js-yaml && node scripts/build-posts.mjs
 * Runs automatically in .github/workflows/deploy.yml on every push.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'posts');
const SITE_URL = 'https://shahriarmimon.github.io';

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about.html', changefreq: 'monthly', priority: '0.9' },
  { path: '/research.html', changefreq: 'monthly', priority: '0.9' },
  { path: '/blog.html', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact.html', changefreq: 'monthly', priority: '0.7' },
];

function toIsoDate(value) {
  if (!value) return '';
  if (value instanceof Date && !isNaN(value)) return value.toISOString().slice(0, 10);
  const d = new Date(String(value));
  return isNaN(d) ? String(value) : d.toISOString().slice(0, 10);
}

function parsePost(file) {
  const raw = readFileSync(join(POSTS_DIR, file), 'utf8').replace(/^\uFEFF/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = match ? (yaml.load(match[1]) || {}) : {};
  const body = match ? match[2] : raw;

  const words = body.replace(/[#>*_`\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const slug = file.replace(/\.md$/, '');

  return {
    slug,
    title: data.title || slug,
    date: toIsoDate(data.date),
    category: data.category || 'Uncategorized',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: data.summary || '',
    cover: data.cover || '',
    readingTime: Math.max(1, Math.round(words / 200)),
    draft: data.draft === true || data.draft === 'true',
  };
}

const posts = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.md'))
  .map(parsePost)
  .filter((p) => !p.draft)
  .map(({ draft, ...rest }) => rest)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

writeFileSync(join(POSTS_DIR, 'posts.json'), JSON.stringify(posts, null, 2) + '\n');

const today = new Date().toISOString().slice(0, 10);
const latestPost = posts[0]?.date || today;
const urls = [
  ...STATIC_PAGES.map((p) => ({
    loc: SITE_URL + p.path,
    lastmod: p.path === '/blog.html' ? latestPost : today,
  })),
  ...posts.map((p) => ({
    loc: `${SITE_URL}/blog.html?post=${encodeURIComponent(p.slug)}`,
    lastmod: p.date || today,
  })),
];

const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n') +
  '\n</urlset>\n';

writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Built ${posts.length} published post(s); sitemap has ${urls.length} URLs.`);
