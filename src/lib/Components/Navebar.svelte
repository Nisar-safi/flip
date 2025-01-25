<script>
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import { onMount } from 'svelte';

let donationAmounts = [];
let campaignCategories = [];
let isAmountDropdownOpen = false;
let isCategoryDropdownOpen = false;
let selectedDonationAmount = '';
let selectedCampaignCategory = '';
let amountSearchQuery = '';

// Generate donation amounts dynamically (example logic)
$: if (donationAmounts.length === 0) {
  donationAmounts = Array.from({ length: 2000 }, (_, i) => i + 1);
}

// Filter donation amounts based on search query
$: filteredDonationAmounts = donationAmounts.filter((amount) =>
  amount.toString().includes(amountSearchQuery.trim())
);

// Fetch campaign categories on mount
onMount(async () => {
  let response = await fetch(
    'https://flipbackend.bitcoincash.network/v1/flipstarter-category/'
  );
  if (response.ok) {
    campaignCategories = await response.json();
  } else {
    console.error('Error fetching categories');
  }
});

// Toggle dropdown visibility
function toggleDropdown(type) {
  if (type === 'amount') {
    isAmountDropdownOpen = !isAmountDropdownOpen;
    isCategoryDropdownOpen = false;
  } else if (type === 'category') {
    isCategoryDropdownOpen = !isCategoryDropdownOpen;
    isAmountDropdownOpen = false;
  }
}

// Select a donation amount
function selectDonationAmount(amount) {
  selectedDonationAmount = `${amount} BCH`;
  isAmountDropdownOpen = false;
  window.location.href = `${base}/Filteramount/${amount}`;
}

// Select a campaign category
function selectCampaignCategory(category) {
  selectedCampaignCategory = category;
  isCategoryDropdownOpen = false;
  window.location.href = `${base}/Filter/${category}`;
}

  let isActive = false;

  const toggleMenu = () => {
    isActive = !isActive;
  };

  const navigateTo = (url) => {
    goto(`${base}${url}`);
  };
</script>

<!-- Navbar -->
<nav class="navbar">
  <div class="navbar-brand">
    <a class="navbar-item" on:click={() => navigateTo("/")}> 
      <h1 class="title is-4">Flipstarters</h1>
    </a>
    <!-- Hamburger icon for small screens -->
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded={isActive} on:click={toggleMenu}>
      {#if isActive}
        <i class="fas fa-times" aria-hidden="true"></i>
      {:else}
        <i class="fas fa-bars" aria-hidden="true"></i>
      {/if}
    </a>
  </div>

  <!-- Navbar menu, toggled on small screens -->
  <div class={`navbar-menu ${isActive ? 'is-active' : ''}`}>
    <div class="navbar-end">
      <!-- Donation Amount Filter -->
      <div class="navbar-item dropdown" class:is-active={isAmountDropdownOpen}>
        <div class="dropdown-trigger">
          <i class="fas fa-coins mr-2"></i>
          <a
            class="button  is-small is-flex is-align-items-center"
            href="#"
            on:click={(event) => { event.preventDefault(); toggleDropdown('amount'); }}
            aria-haspopup="true"
            aria-controls="dropdown-menu-amounts"
          >
            {selectedDonationAmount || 'Filter Amount'}
            <span class="icon is-small pl-4">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </div>
        {#if isAmountDropdownOpen}
          <div class="dropdown-menu" id="dropdown-menu-amounts" role="menu">
            <div class="dropdown-content">
              <input
                type="text"
                class="input is-small is-info"
                placeholder="Search amount..."
                bind:value={amountSearchQuery}
              />
              <div class="columns is-multiline">
                {#each filteredDonationAmounts as amount}
                  <div class="column is-full">
                    <a
                      class="dropdown-item"
                      href="#"
                      on:click={(event) => { event.preventDefault(); selectDonationAmount(amount); }}
                    >
                      {amount} BCH
                    </a>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Campaign Category Filter -->
      <div class="navbar-item dropdown" class:is-active={isCategoryDropdownOpen}>
        <div class="dropdown-trigger">
          <i class="fas fa-tags mr-2"></i>
          <a
            class="button  is-small is-flex is-align-items-center"
            href="#"
            on:click={(event) => { event.preventDefault(); toggleDropdown('category'); }}
            aria-haspopup="true"
            aria-controls="dropdown-menu-categories"
          >
            {selectedCampaignCategory || 'Filter Category'}
            <span class="icon is-small  pl-4">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </div>
        {#if isCategoryDropdownOpen}
          <div class="dropdown-menu" id="dropdown-menu-categories" role="menu">
            <div class="dropdown-content">
              <div class="columns is-multiline">
                {#each campaignCategories as category}
                  <div class="column is-full">
                    <a
                      class="dropdown-item"
                      href="#"
                      on:click={(event) => { event.preventDefault(); selectCampaignCategory(category.name); }}
                    >
                      {category.name}
                    </a>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Other Navbar Items -->
      <a class="navbar-item category-active" on:click={() => navigateTo("/Category/running")}>
        <i class="fas fa-play-circle icon-active"></i>
        <span>Active Flipstarters</span>
      </a>
      <a class="navbar-item category-completed" on:click={() => navigateTo("/Category/success")}>
        <i class="fas fa-check-circle icon-completed"></i>
        <span>Completed Flipstarters</span>
      </a>
      <a class="navbar-item category-expired" on:click={() => navigateTo("/Category/expired")}>
        <i class="fas fa-times-circle icon-expired"></i>
        <span>Expired Flipstarters</span>
      </a>
      <a class="navbar-item category-all" on:click={() => navigateTo("/Category")}>  
        <i class="fas fa-th-list icon-all"></i>
        <span>All Flipstarters</span>
      </a>
      <a class="navbar-item category-about" on:click={() => navigateTo("/AboutThisPage")}>
        <i class="fas fa-info-circle icon-about"></i>
        <span>About This Page</span>
      </a>
    </div>
  </div>
</nav>


<style>
  .dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .input {
    margin-bottom: 0.5rem;
  }

  .navbar {
    padding: 1rem;
    background: transparent;
  }

  .navbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.7rem 1rem;
    transition: background-color 0.3s ease, border-color 0.9s ease;
  }

  .navbar-item i {
    margin-bottom: 0.5rem;
    padding: 0.45rem;
    border-radius: 50%;
    color: white;
  }

  /* Specific icon background colors */
  .icon-active {
    background-color: #d10000;
  }

  .icon-completed {
    background-color: #36a2eb;
  }

  .icon-expired {
    background-color: #38ff74;
  }

  .icon-all {
    background-color: #ffdd57;
  }

  .icon-about {
    background-color: #795548;
  }

  /* Hover effect on icons */
  .navbar-item:hover i {
    background-color: #333;
  }

  .navbar-burger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
  }

  .navbar-burger i {
    color: #0a0909;
  }

  @media screen and (max-width: 768px) {
    .navbar-item {
      font-size: 14px;
      padding: 0.5rem 1rem;
    }
  }

  @media screen and (min-width: 769px) {
    .navbar-burger {
      display: none;
    }
  }
</style>

