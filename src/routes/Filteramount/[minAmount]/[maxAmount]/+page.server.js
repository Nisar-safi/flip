import fs from 'fs';

export async function load({ params }) {
    console.log("Route parameters:", params);

    const { minAmount, maxAmount } = params;
    if (!minAmount || !maxAmount) {
        console.error("Missing min or max amount in the route.");
        return { campaigns: [] };
    }

    // Convert params to numbers
    const min = parseFloat(minAmount) * 100_000_000;
    const max = parseFloat(maxAmount) * 100_000_000;

    if (isNaN(min) || isNaN(max)) {
        console.error("Invalid min or max amount:", minAmount, maxAmount);
        return { campaigns: [] };
    }

    try {
        // **Read campaigns from local JSON file**
        const data = JSON.parse(fs.readFileSync('static/campaigns.json', 'utf8'));

        // **Filter the campaigns based on amount**
        const campaigns = data.filter(
            (product) => product.amount >= min && product.amount <= max
        );

        return { campaigns };
    } catch (error) {
        console.error("Error reading campaigns.json:", error);
        return { campaigns: [] };
    }
}
