import fs from 'fs';



export const load = async ({ params }) => {
    console.log("Route parameters:", params);

    // Check if category parameter is available
    if (!params.category) {
        console.error("No category parameter in the route.");
        return { campaigns: [] };
    }

    // Function to read local JSON file
    const readLocalJson = () => {
        console.log("Attempting to read campaigns from local JSON file...");
        try {
            const data = JSON.parse(fs.readFileSync('static/campaigns.json', 'utf8'));
            console.log("Fetched campaigns data from local JSON file:", data);
            return data;
        } catch (error) {
            console.error("Error reading local JSON file:", error);
            return [];
        }
    };

    try {
        let allProducts = [];

        // Read campaigns data from the local JSON file
        allProducts = readLocalJson();

        // Clean up the category filter and convert to an array
        const categories = params.category
            .split(",") // Split by commas to get an array
            .map(category => decodeURIComponent(category.trim().toLowerCase())); // Decode and normalize
        console.log("Categories filter:", categories);

        // Filter campaigns by categories
        const campaigns = allProducts.filter((product) =>
            product.categories.some(
                (category) =>
                    categories.includes(category.name.toLowerCase()) // Check if any category matches
            )
        );
        console.log("Filtered campaigns by categories:", campaigns);

        return {
            campaigns,
        };
    } catch (error) {
        console.error("Error processing campaigns:", error);
        return {
            campaigns: [], // Return an empty array in case of error
        };
    }
};
