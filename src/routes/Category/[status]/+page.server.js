import fs from 'fs';

export const load = async ({ params }) => {
    console.log("Route parameters:", params);

    if (!params.status) {
        console.error("No status parameter in the route.");
    }

    try {
        // Read the local JSON file
        const allProducts = JSON.parse(fs.readFileSync('static/campaigns.json', 'utf8'));
        console.log("Fetched campaigns data from local JSON file:", allProducts);

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
        console.error("Error reading or processing campaigns.json:", error);
        return { campaigns: [] }; 
    }
};
