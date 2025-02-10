export const load = async ({ params, fetch }) => {
    console.log("Route parameters:", params);

    // Check if category parameter is available
    if (!params.category) {
        console.error("No category parameter in the route.");
        return { campaigns: [] };
    }

    try {
        // Fetch campaigns data from the API
        const response = await fetch('https://flipbackend.bitcoincash.network/v1/flipstarter/');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        let allProducts = await response.json();
        console.log("Fetched campaigns data from API:", allProducts);

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

        return { campaigns };
    } catch (error) {
        console.error("Error fetching or processing campaigns:", error);
        return { campaigns: [] }; // Return an empty array in case of error
    }
};
