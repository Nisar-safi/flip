export const prerender = true;

export let load = async ({ fetch }) => {
    try {
        // Fetch the JSON file from the `static/` folder
        const response = await fetch('/campaigns.json');
        if (!response.ok) throw new Error("Failed to load campaigns.json");

        const campaigns = await response.json();
        console.log("Fetched campaigns data from JSON file:", campaigns);

        return { campaigns };
    } catch (error) {
        console.error("Error fetching campaigns.json:", error);
        return { campaigns: [] }; 
    }
};
