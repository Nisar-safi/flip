export const load = async ({ fetch, params }) => {
	console.log("Route parameters:", params);

	if (!params.category) {
		console.error("No category parameter in the route.");
	}

	// Check if the code is running on the client-side
	const isClient = typeof window !== "undefined";

	// Function to fetch campaigns and store in localStorage
	const fetchAndCacheProducts = async () => {
		if (isClient) {
			// Check if data is already in localStorage
			const cachedData = localStorage.getItem("flipstarter-campaigns");

			if (cachedData) {
				console.log("Using cached campaigns data.");
				return JSON.parse(cachedData); // Parse cached data
			}
		}

		// If no cached data, fetch from API
		const res = await fetch(
			`https://flipbackend.bitcoincash.network/v1/flipstarter/`
		);
		console.log("Fetch response status:", res.status);

		if (!res.ok) {
			throw new Error("Failed to fetch campaigns");
		}
		const data = await res.json();
		console.log("Fetched campaigns data:", data);

		// Cache the data in localStorage (client-side only)
		if (isClient) {
			localStorage.setItem("flipstarter-campaigns", JSON.stringify(data));
		}

		return data;
	};

	try {
		// Fetch and cache the data
		const allProducts = await fetchAndCacheProducts();

		// Apply filters using localStorage
		let campaigns = [];
		if (isClient) {
			const cachedData = JSON.parse(localStorage.getItem("flipstarter-campaigns"));
			const categoryFilter = params.category; // Single category from URL
			console.log("Category filter:", categoryFilter);

			// Filter campaigns locally for the single category
			campaigns = (cachedData || []).filter((product) =>
				Array.isArray(product.categories) &&
				product.categories.some((cat) => cat.name === categoryFilter)
			);
			console.log("Filtered campaigns by category:", campaigns);
		}

		return {
			campaigns: campaigns || [], // Return filtered campaigns
		};
	} catch (error) {
		console.error("Error fetching or filtering campaigns:", error);
		return {
			campaigns: [], // Return an empty array in case of error
		};
	}
};
