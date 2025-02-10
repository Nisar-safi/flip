import fs from 'fs';
import fetch from 'node-fetch';

async function fetchCampaigns() {
    const API_URL = "https://flipbackend.bitcoincash.network/v1/flipstarter/";

    try {
        console.log("Fetching campaigns from API...");
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch campaigns");

        const data = await res.json();

        // Save to a local JSON file
        fs.writeFileSync('./static/campaigns.json', JSON.stringify(data, null, 2));
        console.log("✅ Campaigns saved to static/campaigns.json");
    } catch (error) {
        console.error("Error fetching campaigns:", error);
    }
}

fetchCampaigns();
