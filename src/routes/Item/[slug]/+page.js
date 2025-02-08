export const prerender = true;
export async function load({ params, fetch }) {
    console.log("Route parameters:", params);

    // Fetch the JSON file from the `static/` folder
    let data = [];
    try {
        const response = await fetch('/campaigns.json');
        if (!response.ok) throw new Error("Failed to load campaigns.json");

        data = await response.json();
        console.log("Fetched campaigns data from JSON file:", data);
    } catch (error) {
        console.error("Error fetching campaigns.json:", error);
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
