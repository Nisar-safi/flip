export async function GET() {
    const baseUrl = 'https://flip-neon-two.vercel.app';
    const productsApiUrl = 'https://flipbackend.bitcoincash.network/v1/flipstarter/';
    const categoriesApiUrl = 'https://flipbackend.bitcoincash.network/v1/flipstarter-category/';

    /**
     * Fetch data from API and handle errors.
     */
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

    /**
     * Convert text to a URL-friendly slug.
     */
    
function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

    /**
     * Escape special XML characters.
     */
    const escapeXml = (unsafe) =>
        unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');

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

    const staticPages = [
        { url: '/', priority: 1.0 },
        { url: '/AboutThisPage', priority: 0.8 },
        { url: '/FormComonent', priority: 0.8 },
    ];

    const allUrls = [
        ...staticPages.map((page) => ({
            url: page.url,
            priority: page.priority,
            changefreq: 'monthly',
            lastmod: new Date().toISOString().split('T')[0],
        })),
        ...productUrls,
        ...categoryUrls,
        ...additionalCategoryUrls,
    ];

    /**
     * Generate sitemap XML string.
     */
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

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
