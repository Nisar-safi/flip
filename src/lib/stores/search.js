import { writable } from "svelte/store";

// Create the search store without TypeScript type annotations
export const createSearchStore = (data) => {
	const { subscribe, set, update } = writable({
		data: data,
		filtered: data,
		search: "",
	});

	return {
		subscribe,
		set,
		update,
	};
};

// Handle the search functionality without TypeScript type annotations
export const searchHandler = (store) => {
	const searchTerm = store.search.toLowerCase() || "";
	store.filtered = store.data.filter((item) => {
		return item.searchTerms.toLowerCase().includes(searchTerm);
	});
};
