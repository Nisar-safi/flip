<script>
	import { base } from "$app/paths"; // Import the base path
	export let data;

	$: ({ campaigns } = data); // this line
	console.log("campaigns in svelete page:", data);

	// targeting title for the next page
	function slugify(text) {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	}

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 5; // Set the number of items you want per page

	// Calculate total pages
	$: totalPages = Math.ceil(campaigns.length / itemsPerPage);

	// Get the items for the current page
	function getPaginatedItems(page) {
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return campaigns.slice(start, end);
	}

	function getPaginatedItemsAgain(items, page) {
		totalPages = Math.ceil(items.length / itemsPerPage);
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return items.slice(start, end);
	}

	// The campaigns to display on the current page
	$: paginatedCampaigns = getPaginatedItems(currentPage);

	// Navigate to a specific page
	function goToPage(page) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			paginatedCampaigns = getPaginatedItems(page);
		}
	}

	import { createSearchStore, searchHandler } from "$lib/stores/search";
	import { onDestroy } from "svelte";
	$: searchCampaignsData = data.campaigns.map((campaign) => ({
		...campaign,
		searchTerms: `${campaign.title} ${campaign.description} ${campaign.category}`,
	}));
	$: searchStore = createSearchStore(searchCampaignsData);
	$: unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	function getSnippet(campaign, search) {
		const searchLower = search.toLowerCase();
		const titleIndex = campaign.title.toLowerCase().indexOf(searchLower);
		const descriptionIndex = campaign.description
			.toLowerCase()
			.indexOf(searchLower);

		if (titleIndex !== -1) {
			return null; // No need for a snippet if the search term is in the title
		} else if (descriptionIndex !== -1) {
			const snippetStart = Math.max(0, descriptionIndex - 20);
			const snippetEnd = Math.min(
				campaign.description.length,
				descriptionIndex + search.length + 60
			);
			const snippet = campaign.description.slice(snippetStart, snippetEnd);
			const highlightedSnippet = snippet.replace(
				new RegExp(`(${search})`, "gi"),
				"<mark>$1</mark>"
			);
			return `...${highlightedSnippet}...`;
		} else {
			return null;
		}
	}
</script>

<main>
	<section class="section mt-3">
		<div class="container">
			<h1 class="title has-text-centered mt-4">Campaigns</h1>
			<div class="columns is-centered is-multiline">
				{#if paginatedCampaigns.length === 0}
					<div class="column">
						<p>No campaigns available.</p>
					</div>
				{:else}
					<div class="columns column is-8">
						<div class="column is-8 is-offset-2">
							<div class="container">
								<h1 class="title has-text-centered mt-4">Quick Search</h1>
								<div class="field has-addons">
									<div class="control is-expanded">
										<input
											class="input"
											type="text"
											placeholder="Search..."
											bind:value="{$searchStore.search}"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{#each getPaginatedItemsAgain($searchStore.filtered, currentPage) as campaign, index (campaign)}
						<div class="column is-half">
							<div class="card">
								<div class="card-content">
									<div class="content">
										<div class="containerr">
											<div class="left_side">
												<span class="icon">
													<i class="fas fa-fire mr-1"></i>
												</span>
											</div>
											<div class="right_side">
												<h1 class="title is-4">
													<a
														href="{base}{`/Item/${slugify(campaign.title)}`}"
													>
														{campaign.title}
													</a>
												</h1>
												{#if getSnippet(campaign, $searchStore.search)}
													<p class="snippet">
														{@html getSnippet(campaign, $searchStore.search)}
													</p>
												{/if}
											</div>
										</div>
										<p class="mt-1">
											<strong>
												<span class="icon"><i class="fas fa-coins"></i></span>
												Amount:
											</strong>
											{(campaign.amount / 100000000).toFixed()} BCH
										</p>
										<div class="container">
											<div class="mb-3">
												{#if $searchStore.search == ""}
													<strong>
														<span class="icon"
															><i class="fas fa-hashtag"></i></span
														> Index:
													</strong>
													<span class="ml-2">
														{(currentPage - 1) * itemsPerPage + index + 1}
													</span>
												{/if}
											</div>
											
										</div>

										<div class="is-flex mt-3">
											<div>
											  <strong>
												<span class="icon"><i class="fas fa-archive"></i></span> Archive:
											  </strong>
											</div>
											{#if campaign.archive && campaign.archive.length > 0}
											  {#each campaign.archive as archiv, index (archiv)}
												<a href="{archiv.url}" class="is-link ml-2" target="_blank">
												  #{index + 1}
												</a>
											  {/each}
											
											  
											{/if}
										  </div>
										  
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<!-- Pagination Controls -->
			<nav
				class="pagination is-centered"
				role="navigation"
				aria-label="pagination"
			>
				<button
					class="pagination-previous"
					on:click="{() => goToPage(currentPage - 1)}"
					disabled="{currentPage === 1}"
				>
					« Prev
				</button>
				<ul class="pagination-list">
					<!-- First page button -->
					<li>
						<button
							class="pagination-link {currentPage === 1 ? 'is-current' : ''}"
							on:click="{() => goToPage(1)}"
						>
							1
						</button>
					</li>
					<!-- Ellipsis before current page if necessary -->
					{#if currentPage > 3}
						<li><span class="pagination-ellipsis">…</span></li>
					{/if}
					<!-- Page numbers around the current page -->
					{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page (page)}
						{#if page > 1 && page < totalPages && page >= currentPage - 2 && page <= currentPage + 2}
							<li>
								<button
									class="pagination-link {currentPage === page
										? 'is-current'
										: ''}"
									on:click="{() => goToPage(page)}"
								>
									{page}
								</button>
							</li>
						{/if}
					{/each}
					<!-- Ellipsis after current page if necessary -->
					{#if currentPage < totalPages - 6}
						<li><span class="pagination-ellipsis">…</span></li>
					{/if}
					<!-- Last page button -->
					{#if totalPages > 1}
						<li>
							<button
								class="pagination-link {currentPage === totalPages
									? 'is-current'
									: ''}"
								on:click="{() => goToPage(totalPages)}"
							>
								{totalPages}
							</button>
						</li>
					{/if}
				</ul>
				<button
					class="pagination-next"
					on:click="{() => goToPage(currentPage + 1)}"
					disabled="{currentPage === totalPages}"
				>
					Next »
				</button>
			</nav>
		</div>
	</section>
</main>

<style>
	.pagination-link.is-current {
		background-color: #3273dc;
		color: #fff;
	}
	.pagination-link {
		cursor: pointer;
	}
	.pagination-ellipsis {
		padding: 0.5em;
	}

	.title.is-4 a {
		display: -webkit-box;
		-webkit-line-clamp: 2; /* Ensure this matches the value in the script */
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.containerr {
		display: flex;
		align-items: center;
	}

	.icon {
		margin-right: 0.5rem;
	}
</style>
