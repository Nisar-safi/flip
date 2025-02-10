export async function load({ params, fetch }) {
    console.log("Route parameters:", params);

    try {
        // Fetch campaigns data from the API
        const response = await fetch('https://flipbackend.bitcoincash.network/v1/flipstarter/');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched campaigns data from API:", data);

        // Find the campaign that matches the slug
        const campaign = data.find(campaign => slugify(campaign.title) === params.slug);

        if (!campaign) {
            return { status: 404, error: new Error('Not found') };
        }

        return { campaign };
    } catch (error) {
        console.error("Error fetching or processing campaigns:", error);
        return { status: 500, error: new Error('Failed to load campaigns') };
    }
}

// Slugify function to convert campaign titles to URL-friendly slugs
function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
