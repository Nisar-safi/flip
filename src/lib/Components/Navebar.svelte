<script>
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  let isActive = false;

  const toggleMenu = () => {
    isActive = !isActive;
  };

  const navigate = (event, path) => {
    event.preventDefault(); // Prevent full page reload
    goto(path);
  };
</script>

<!-- Navbar -->
<nav class="navbar container">
  <div class="navbar-brand">
    <div class="navbar-item">
      <a href="{base}/" on:click={(e) => navigate(e, `${base}/`)}>
        <h1 class="title is-4">Flipstarters</h1>
      </a>
    </div>
    <!-- Hamburger icon for small screens -->
    <div role="button" class="navbar-burger" aria-label="menu" aria-expanded={isActive} on:click={toggleMenu}>
      {#if isActive}
        <i class="fas fa-times" aria-hidden="true"></i>
      {:else}
        <i class="fas fa-bars" aria-hidden="true"></i>
      {/if}
    </div>
  </div>

  <!-- Navbar menu, toggled on small screens -->
  <div class={`navbar-menu ${isActive ? 'is-active' : ''}`}>
    <div class="navbar-end">
      <!-- Other Navbar Items -->
      <div class="navbar-item category-active">
        <a href="{base}/Category/running" on:click={(e) => navigate(e, `${base}/Category/running`)}>
          <i class="fas fa-play-circle icon-active"></i>
          <span>Active Flipstarters</span>
        </a>
      </div>
      <div class="navbar-item category-completed">
        <a href="{base}/Category/success" on:click={(e) => navigate(e, `${base}/Category/success`)}>
          <i class="fas fa-check-circle icon-completed"></i>
          <span>Completed Flipstarters</span>
        </a>
      </div>
      <div class="navbar-item category-expired">
        <a href="{base}/Category/expired" on:click={(e) => navigate(e, `${base}/Category/expired`)}>
          <i class="fas fa-times-circle icon-expired"></i>
          <span>Expired Flipstarters</span>
        </a>
      </div>
      <div class="navbar-item category-all">
        <a href="{base}/Category" on:click={(e) => navigate(e, `${base}/Category`)}>
          <i class="fas fa-th-list icon-all"></i>
          <span>All Flipstarters</span>
        </a>
      </div>
      <div class="navbar-item category-about">
        <a href="{base}/AboutThisPage" on:click={(e) => navigate(e, `${base}/AboutThisPage`)}>
          <i class="fas fa-info-circle icon-about"></i>
          <span>About This Page</span>
        </a>
      </div>
    </div>
  </div>
</nav>



<style>
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
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  position: relative;
}

.navbar-item:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.navbar-item i {
  margin-bottom: 0.5rem;
  padding: 0.45rem;
  border-radius: 50%;
  color: white;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

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

.navbar-item:hover i {
  background-color: #333;
  transform: scale(1.1);
}

.navbar-item:hover {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.navbar-burger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
}

@media screen and (max-width: 768px) {
  .navbar-item {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }

  .navbar-item:hover {
    transform: none;
    box-shadow: none;
  }

  .navbar-item:hover i {
    transform: none;
  }

  .navbar-item:hover {
    border: none;
    border-radius: 0;
  }
}

@media screen and (min-width: 769px) {
  .navbar-burger {
    display: none;
  }
}
</style>