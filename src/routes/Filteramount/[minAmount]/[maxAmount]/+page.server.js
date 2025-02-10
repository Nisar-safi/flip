export async function load({ params, fetch }) {
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
        // **Fetch campaigns data from the API**
        const response = await fetch('https://flipbackend.bitcoincash.network/v1/flipstarter/');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched campaigns data from API:", data);

        // **Filter the campaigns based on amount**
        const campaigns = data.filter(
            (product) => product.amount >= min && product.amount <= max
        );

        return { campaigns };
    } catch (error) {
        console.error("Error fetching or processing campaigns:", error);
        return { campaigns: [] };
    }
}
