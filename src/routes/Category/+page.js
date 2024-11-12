// src/routes/+page.js
// @ts-ignore
export  let load = async ({ fetch }) => {
    const url = "https://flipbackend.bitcoincash.network/v1/flipstarter/?old";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const campaigns = await response.json();
      console.log("Fetched campaigns data CompletedFlipstarters sending data to +page.svelte:", campaigns); // Log the data
      return {
        campaigns
      };
    } catch (error) {
      console.error("Error loading campaigns:", error);
      return {
        campaigns: [],
        
      };
    }
  }
  