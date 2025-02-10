import fs from 'fs';

export let load = async () => {
    const filePath = 'static/campaigns.json';

    try {
        // Read the local JSON file
        const campaigns = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log("Fetched campaigns data from local JSON file:", campaigns);

        return { campaigns };
    } catch (error) {
        console.error("Error reading campaigns.json:", error);
        return { campaigns: [] }; 
    }
};
