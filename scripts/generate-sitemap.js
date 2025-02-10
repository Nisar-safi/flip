import fs from 'fs';
import path from 'path';

const baseUrl = 'https://half_engineer.codeberg.page/dpractice';
const productsApiUrl = 'https://flipbackend.bitcoincash.network/v1/flipstarter/';
const categoriesApiUrl = 'https://flipbackend.bitcoincash.network/v1/flipstarter-category/';

const escapeXml = (unsafe) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [];
  }
};

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const excludedRoutes = [
  'Category/[status]',
  'Filter/[category]',
  'Filteramount/[minAmount]/[maxAmount]',
  'Item/[slug]'
];

const getPages = (dir, categories = [], currentPath = '') => {
  const files = fs.readdirSync(dir);
  let pages = new Set();

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getPages(filePath, categories, path.join(currentPath, file)).forEach((page) => pages.add(page));
    } else if (/^\+page\.(svelte|ts|js|md)$/.test(file)) {
      let route = currentPath.replace(/\\/g, '/');

      // Exclude unwanted routes
      if (excludedRoutes.some((excluded) => route.includes(excluded))) return;

      if (route.includes('[Filter]')) {
        categories.forEach((category) => {
          pages.add(route.replace('[Filter]', slugify(category)));
        });
      } else {
        pages.add(route);
      }
    }
  });

  return Array.from(pages);
};

const generateSitemap = async () => {
  const [products, categories] = await Promise.all([
    fetchData(productsApiUrl),
    fetchData(categoriesApiUrl),
  ]);

  const productUrls = products.map((product) => ({
    url: `/Item/${slugify(product.title)}`,
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: product.date_of_insert
      ? new Date(product.date_of_insert).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }));

  const categoryUrls = categories.map((category) => ({
    url: `/Filter/${slugify(category.name)}`,
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  }));

  const additionalCategoryUrls = ['success', 'running', 'expired'].map((status) => ({
    url: `/Category/${status}`,
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  }));

  const filterAmountUrls = [];
  for (let min = 1; min <= 1001; min += 10) {
    for (let max = min + 10; max <= 1001; max += 10) {
      filterAmountUrls.push({
        url: `/Filteramount/${min}/${max}`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
      });
    }
  }

  const pages = getPages('src/routes', categories.map((c) => c.name));

  const allUrls = [
    ...pages.map((page) => ({
      url: page === '' ? '/' : `/${page}`,
      priority: page === '' ? 1.0 : 0.8,
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0],
    })),
    ...productUrls,
    ...categoryUrls,
    ...additionalCategoryUrls,
    ...filterAmountUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (entry) => `
    <url>
        <loc>${escapeXml(baseUrl + entry.url)}</loc>
        <priority>${entry.priority}</priority>
        <changefreq>${entry.changefreq}</changefreq>
        <lastmod>${entry.lastmod}</lastmod>
    </url>`
      )
      .join('')}
</urlset>`;

  if (!fs.existsSync('static')) fs.mkdirSync('static', { recursive: true });
  fs.writeFileSync('static/sitemap.xml', sitemap);

  console.log('✅ Sitemap generated successfully at static/sitemap.xml');
};

generateSitemap();
