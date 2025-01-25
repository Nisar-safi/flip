export const load = async ({ fetch, params }) => {
	console.log("Route parameters:", params);

	if (!params.status) {
		console.error("No status parameter in the route.");
	}

	const fetchProducts = async () => {
		console.log("Attempting to fetch campaigns...");
		const res = await fetch(
			`https://flipbackend.bitcoincash.network/v1/flipstarter/?old`
		);
		console.log("Fetch response status:", res.status);

		if (!res.ok) {
			throw new Error("Failed to fetch campaigns");
		}
		const data = await res.json();
		console.log("Fetched campaigns data:", data);
		return data;
	};

	try {
		const allProducts = await fetchProducts();
		console.log("All campaigns:", allProducts);

		// Log available status values in the fetched data
		const availableStatuses = [
			...new Set(allProducts.map((product) => product.status)),
		];
		console.log("Available statuses in data:", availableStatuses);

		// Log the `status` parameter to see if it matches any in the data
		const statusFilter = params.status;
		console.log("Status filter:", statusFilter);

		// Filter campaigns by status
		const campaigns = (allProducts || []).filter(
			(product) => product.status === statusFilter
		);
		console.log("Filtered campaigns by status:", campaigns);

		return {
			campaigns,
		};
	} catch (error) {
		console.error("Error fetching or filtering campaigns:", error);
		return {
			campaigns: [], // Return an empty array in case of error
		};
	}
};
