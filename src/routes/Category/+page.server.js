export let load = async ({ fetch }) => {
    try {
        // Fetch data from the API
        const response = await fetch('https://flipbackend.bitcoincash.network/v1/flipstarter/');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const campaigns = await response.json();
        console.log("Fetched campaigns data from API:", campaigns);

        return { campaigns };
    } catch (error) {
        console.error("Error fetching campaigns data:", error);
        return { campaigns: [] }; 
    }
};
