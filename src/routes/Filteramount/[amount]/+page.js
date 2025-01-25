export const load = async ({ params }) => {
	console.log("Route parameters:", params);

	if (!params.amount) {
		console.error("No amount parameter in the route.");
		return { campaigns: [] }; // Early return in case of missing parameter
	}

	const fetchProducts = async () => {
		console.log("Attempting to fetch campaigns from API...");
		const res = await fetch(
			`https://flipbackend.bitcoincash.network/v1/flipstarter/`
		);
		console.log("Fetch response status:", res.status);

		if (!res.ok) {
			throw new Error("Failed to fetch campaigns");
		}
		const data = await res.json();
		console.log("Fetched campaigns data from API:", data);
		return data;
	};

	try {
		// Retrieve data from localStorage or fetch from API if not available
		let allProducts = JSON.parse(localStorage.getItem("campaignsData"));
		if (!allProducts) {
			console.log("No data in localStorage. Fetching from API...");
			allProducts = await fetchProducts();
			localStorage.setItem("campaignsData", JSON.stringify(allProducts));
			console.log("Data saved to localStorage.");
		} else {
			console.log("Using data from localStorage:", allProducts);
		}

		// Print all amounts from the data
		const allAmounts = allProducts.map((product) => product.amount);
		console.log("All amounts in the data:", allAmounts);

		// Convert the amount parameter to BCH and then to Satoshis
		const amountFilterInBCH = parseFloat(params.amount);
		if (isNaN(amountFilterInBCH)) {
			console.error("Invalid amount parameter:", params.amount);
			throw new Error("Amount parameter is not a valid number.");
		}
		console.log("Amount filter (in BCH):", amountFilterInBCH);

		const amountFilterInSatoshis = amountFilterInBCH * 100_000_000;
		console.log("Amount filter (in Satoshis):", amountFilterInSatoshis);

		// Filter campaigns by amount
		const campaigns = (allProducts || []).filter(
			(product) => product.amount === amountFilterInSatoshis
		);
		console.log("Filtered campaigns by amount:", campaigns);

		return {
			campaigns,
		};
	} catch (error) {
		console.error("Error processing campaigns:", error);
		return {
			campaigns: [], // Return an empty array in case of error
		};
	}
};
