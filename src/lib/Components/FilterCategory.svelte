<script>
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let campaignCategories = [];
  let selectedCategories = [];
  let showAll = false;

  const categoryColors = [
    { category: "Web3", color: "blue" },
    { category: "License-UNKNOWN", color: "darkgoldenrod" },
    { category: "Travel", color: "teal" },
    { category: "Random", color: "indigo" },
    { category: "SocialMedia", color: "cyan" },
    { category: "Hardware", color: "aqua" },
    { category: "Informative", color: "turquoise" },
    { category: "Education", color: "skyblue" },
    { category: "License-Proprietary", color: "royalblue" },
    { category: "SLP", color: "cornflowerblue" },
    { category: "License-MPL2", color: "steelblue" },
    { category: "Infrastructure", color: "red" },
    { category: "Marketing", color: "green" },
    { category: "SCAM?", color: "grey" },
    { category: "Crowdfunding", color: "lime" },
    { category: "Adoption", color: "forestgreen" },
    { category: "License-Apache2", color: "dodgerblue" },
    { category: "Usecase", color: "gold" },
    { category: "Wallet", color: "mediumblue" },
    { category: "VideoGame", color: "deepskyblue" },
    { category: "Humanitarian", color: "seagreen" },
    { category: "License-MIT", color: "slateblue" },
    { category: "License-GPLv3", color: "mediumslateblue" },
    { category: "Hackathon", color: "paleturquoise" },
    { category: "Healthcare", color: "springgreen" },
    { category: "Documentary", color: "lightseagreen" },
    { category: "News", color: "darkturquoise" },
    { category: "Rewards", color: "mediumseagreen" },
    { category: "License-AGPLv3", color: "darkblue" },
    { category: "Charity", color: "olivedrab" },
    { category: "Developer", color: "crimson" },
    { category: "Gaming", color: "cadetblue" },
    { category: "NFT", color: "goldenrod" },
    { category: "Software", color: "midnightblue" },
    { category: "Video", color: "powderblue" },
    { category: "Remittance", color: "yellowgreen" },
    { category: "Other", color: "darkgrey" },
    { category: "SmartBCH", color: "mediumpurple" },
    { category: "DeFi", color: "darkgoldenrod" },
  ];

  function getCategoryStyle(categoryName) {
    const category = categoryColors.find((item) => item.category === categoryName);
    return category ? category.color : "grey"; 
  }

  onMount(async () => {
    try {
      let response = await fetch(
        "https://flipbackend.bitcoincash.network/v1/flipstarter-category/"
      );
      if (response.ok) {
        campaignCategories = await response.json();
      } else {
        console.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
  }

  function applyFilter() {
    if (selectedCategories.length > 0) {
      let filterUrl = `${base}/Filter/${selectedCategories.join(",")}`;
      goto(filterUrl);
    }
  }

  function toggleShowAll() {
    showAll = !showAll;
  }

  function clearSelection() {
    selectedCategories = [];
  }
</script>

<div class="container">
  <h1 class="title has-text-centered mt-4">Campaigns Filter by Category</h1>

  <div class="categories">
    {#each (showAll ? campaignCategories : campaignCategories.slice(0, 8)) as category, i (category.name)}
      <button
        class="button {selectedCategories.includes(category.name) ? 'selected' : ''}"
        on:click={() => toggleCategory(category.name)}
        style="
          border-color: {getCategoryStyle(category.name)};
          color: {getCategoryStyle(category.name)};
          --hover-color: {getCategoryStyle(category.name)};
        "
        class:fade-in={i % 2 === 0}
      >
        {category.name}
      </button>
    {/each}
  </div>
  {#each categoryColors as { category }}
    <a  href="{base}/Filter/{encodeURIComponent(category)}"></a>
  {/each}
  {#if campaignCategories.length > 8}
    <button on:click={toggleShowAll} class="button is-rounded see-more-btn">
      {showAll ? "See Less" : "See More"}
    </button>
  {/if}

  <div class="buttons-container">
    <button
      on:click={applyFilter}
      disabled={selectedCategories.length === 0}
      class="button is-primary is-rounded apply-btn"
      
    >
      Apply Filter
    </button>
  
  
    <button
      on:click={clearSelection}
      disabled={selectedCategories.length === 0}
      class="button is-danger is-rounded clear-btn"
    >
      Clear Selection
    </button>
  </div>
</div>

<style>
  .container {
    max-width: 700px;
    margin: 20px auto;
    text-align: center;
    opacity: 0;
    animation: fadeIn 1s forwards;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  .button.selected {
    background-color: var(--hover-color);
    color: white !important;
    border-color: var(--hover-color);
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }

  .button {
    padding: 10px 15px;
    border: 2px solid;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    font-weight: bold;
    color: black; 
  }

  .button:hover {
    background-color: var(--hover-color);
    color: white !important;
    transform: scale(1.1);
  }

  .see-more-btn,
  .apply-btn,
  .clear-btn {
    margin-top: 10px;
    padding: 12px 20px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    
  }

  .see-more-btn:hover {
    background-color: #2980B9;
    color: white;
  }

  .apply-btn:disabled,
  .clear-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .apply-btn:hover {
    background-color: #3498db;
  }

  .clear-btn {
    background-color: red;
  }

  .clear-btn:hover {
    background-color: darkred;
  }

  .buttons-container {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  /* Animation for each category button */
  .fade-in {
    animation: fadeInButton 0.5s ease-in-out;
  }

  @keyframes fadeInButton {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
