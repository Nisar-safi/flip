export const prerender = true;

export async function load({ params, fetch }) {
    console.log("Route parameters:", params);

    if (!params.status) {
        console.error("No status parameter in the route.");
    }

    try {
        // 🔹 Fetch data from API instead of campaigns.json
        const response = await fetch("https://flipbackend.bitcoincash.network/v1/flipstarter/");
        if (!response.ok) throw new Error("Failed to fetch API data");

        const allProducts = await response.json();
        console.log("Fetched campaigns data from API:", allProducts);

        // Extract available statuses
        const availableStatuses = [...new Set(allProducts.map(product => product.status))];
        console.log("Available statuses in data:", availableStatuses);

        // Filter campaigns by status
        const statusFilter = params.status;
        console.log("Status filter:", statusFilter);
        const campaigns = allProducts.filter(product => product.status === statusFilter);
        console.log("Filtered campaigns by status:", campaigns);

        return { campaigns };
    } catch (error) {
        console.error("Error fetching or processing API data:", error);
        return { campaigns: [] };
    }
}
