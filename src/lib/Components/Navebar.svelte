<script>
  import { base } from "$app/paths";
  let isActive = false;

  const toggleMenu = () => {
    isActive = !isActive;
  };
</script>

<!-- Navbar -->
<nav class="navbar">
  <div class="navbar-brand">
    <a class="navbar-item" href="{base}{'/'}">
      <h1 class="title is-4">Flipstarters</h1>
    </a>
    <!-- Hamburger icon for small screens -->
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded={isActive} on:click={toggleMenu}>
      {#if isActive}
        <!-- Font Awesome X icon for closing the menu -->
        <i class="fas fa-times" aria-hidden="true"></i>
      {:else}
        <!-- Font Awesome Hamburger icon for opening the menu -->
        <i class="fas fa-bars" aria-hidden="true"></i>
      {/if}
    </a>
  </div>

  <!-- Navbar menu, toggled on small screens -->
  <div class={`navbar-menu ${isActive ? 'is-active' : ''}`}>
    <div class="navbar-end">
      <a href="{base}{'/Category/running'}" class="navbar-item category-active">
        <i class="fas fa-play-circle icon-active"></i> Active Flipstarters
      </a>
      <a href="{base}{'/Category/success'}" class="navbar-item category-completed">
        <i class="fas fa-check-circle icon-completed"></i> Completed Flipstarters
      </a>
      <a href="{base}{'/Category/expired'}" class="navbar-item category-expired">
        <i class="fas fa-times-circle icon-expired"></i> Expired Flipstarters
      </a>
      <a href="{base}{'/Category'}" class="navbar-item category-all">
        <i class="fas fa-th-list icon-all"></i> All Flipstarters
      </a>
      <a href="{base}{'/AboutThisPage'}" class="navbar-item category-about">
        <i class="fas fa-info-circle icon-about"></i> About This Page
      </a>
    </div>
  </div>
</nav>

<style>
  .navbar {
    padding: 1rem;
    background: transparent;
  }

  .navbar-item {
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s ease, border-color 0.9s ease;
  }

  .navbar-item i {
    margin-right: 0.5rem;
    padding: 0.45rem 0.45rem;
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
