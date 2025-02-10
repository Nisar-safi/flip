import fs from 'fs';

export let load = async () => {
    const filePath = 'static/campaigns.json';

    try {
        // Read the local JSON file
        const data = fs.readFileSync(filePath, 'utf8');
        const campaigns = JSON.parse(data);

        console.log("Fetched campaigns data from local JSON file:", campaigns);

        return { campaigns };
    } catch (error) {
        console.error("Error reading campaigns.json:", error);
        return { campaigns: [] }; 
    }
};
