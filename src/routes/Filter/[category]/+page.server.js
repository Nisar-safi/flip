// src/routes/[category]/+page.js
export const prerender = true; // Prerender this page for static hosting

// In-memory storage for campaigns data (global scope within the session)
let allProducts = null;

export const load = async ({ params }) => {
    console.log("Route parameters:", params);

    if (!params.category) {
        console.error("No category parameter in the route.");
        return { campaigns: [] }; // Early return if no category parameter
    }

    const fetchProducts = async () => {
        console.log("Attempting to fetch campaigns from API...");
        const res = await fetch(
            `https://flipbackend.bitcoincash.network/v1/flipstarter/`
        );
        console.log("Fetch response status:", res.status);

        if (!res.ok) {
            throw new Error("Failed to fetch campaigns");
        }
        const data = await res.json();
        console.log("Fetched campaigns data from API:", data);
        return data;
    };

    try {
        // Use in-memory storage for all products (no localStorage)
        if (!allProducts) {
            console.log("No data in memory. Fetching from API...");
            allProducts = await fetchProducts();
            console.log("Data saved to in-memory storage.");
        } else {
            console.log("Using data from in-memory storage:", allProducts);
        }

        // Clean up the category filter (e.g., remove ".html" and decode URL)
        const categoryFilter = decodeURIComponent(params.category.replace('.html', '').toLowerCase());
        console.log("Category filter:", categoryFilter);

        // Filter campaigns by category
        const campaigns = (allProducts || []).filter((product) =>
            product.categories.some(
                (category) =>
                    category.name.toLowerCase().includes(categoryFilter) // Use includes for partial matches
            )
        );
        console.log("Filtered campaigns by category:", campaigns);

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
