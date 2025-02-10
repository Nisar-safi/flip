import fs from 'fs';

export async function load({ params }) {
    console.log("Route parameters:", params);

    // Read the local JSON file
    let data = [];
    try {
        data = JSON.parse(fs.readFileSync('static/campaigns.json', 'utf8'));
        console.log("Fetched campaigns data from local JSON file:", data);
    } catch (error) {
        console.error("Error reading campaigns.json:", error);
        return { status: 500, error: new Error('Failed to load campaigns') };
    }

    // Find the campaign that matches the slug
    const campaign = data.find(campaign => slugify(campaign.title) === params.slug);

    if (!campaign) {
        return { status: 404, error: new Error('Not found') };
    }

    return { campaign };
}

// Slugify function to convert campaign titles to URL-friendly slugs
function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
