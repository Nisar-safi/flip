export const load = async ({ params, fetch }) => {
    console.log("Route parameters:", params);

    if (!params.status) {
        console.error("No status parameter in the route.");
    }

    try {
        // Fetch data from the API
        const response = await fetch('https://flipbackend.bitcoincash.network/v1/flipstarter/');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const allProducts = await response.json();
        console.log("Fetched campaigns data from API:", allProducts);

        // Log available status values in the fetched data
        const availableStatuses = [...new Set(allProducts.map((product) => product.status))];
        console.log("Available statuses in data:", availableStatuses);

        // Log the `status` parameter to see if it matches any in the data
        const statusFilter = params.status;
        console.log("Status filter:", statusFilter);

        // Filter campaigns by status
        const campaigns = allProducts.filter(product => product.status === statusFilter);
        console.log("Filtered campaigns by status:", campaigns);

        return { campaigns };
    } catch (error) {
        console.error("Error fetching or processing campaigns data:", error);
        return { campaigns: [] }; 
    }
};
