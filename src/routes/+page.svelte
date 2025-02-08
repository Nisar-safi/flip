<script>
  import FilterAmount from "$lib/Components/FilterAmount.svelte";
  import { base } from "$app/paths";
 import FilterCategory from "$lib/Components/FilterCategory.svelte";
  import { goto } from "$app/navigation";

  function navigate() {
    goto(`${base}/FormComponent`);
  }
</script>


<section class="section container">
  <div class="columns is-centered">
    <div class="column">
      <div class="card">
        <div class="card-content has-text-centered">
          <h1 class="title">Flipstarters on Bitcoin Cash</h1>
          <hr />

          <FilterCategory />
          <hr />

          <FilterAmount />

          <p>
            Flipstarter provides a way for any project to engage with potential
            funders in a way that encourages accountability for projects and
            fairness for funders.
          </p>
          <p>
            This page keeps an overview of active and historical flipstarters.
          </p>
          <p>Do you know of a flipstarter that is not listed here?</p>
          <a on:click={navigate} class="button is-primary mt-3"
            >Submit a flipstarter</a
          >

          <div class="mt-5">
            <p>
              So far, <strong>134 projects</strong> have been successfully
              funded using flipstarter, receiving a total of
              <strong>15545.84 BCH</strong>.
            </p>
          </div>

          <div class="buttons mt-3">
            <a
              href="https://flipstarter.cash/en/how-to-pledge"
              class="button is-info mb-3">How to pledge</a
            >
            <a href="https://flipstarter.cash/en/how-to" class="button is-dark"
              >Start a campaign</a
            >
          </div>

          <p class="mt-3">
            A flipstarter listing is not an endorsement. Always do your own
            research before pledging.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .buttons {
    display: block;
  }

  .container {
    max-width: 450px;
    width: 100%;
    margin: 20px auto;
    padding: 15px;
    text-align: center;
    border-radius: 12px;
  }

  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    margin-bottom: 10px;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background 0.3s;
  }

  .category-item:hover {
    border-color: #00aaff;
  }

  .checkbox {
    accent-color: #00d1b2;
    width: 16px;
    height: 16px;
  }

  .see-more-btn {
    display: block;
    width: 100%;
    background: none;
    border: none;
    color: #0072ff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
    transition: 0.3s;
  }

  .see-more-btn:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  .apply-btn {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    color: white;
    border: none;
    transition: 0.3s;
  }

  .apply-btn:hover {
    background: linear-gradient(135deg, #0072ff, #00c6ff);
  }

  .apply-btn:disabled {
    background: #d3d3d3;
    cursor: not-allowed;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .container {
      padding: 10px;
      margin: 10px;
    }

    .categories {
      grid-template-columns: 1fr 1fr;
    }

    .category-item {
      font-size: 12px;
      padding: 6px 10px;
    }

    .see-more-btn {
      font-size: 12px;
    }

    .apply-btn {
      font-size: 14px;
      padding: 8px;
    }
  }

  @media (max-width: 480px) {
    .container {
      max-width: 100%;
    }

    .categories {
      grid-template-columns: 1fr;
    }

    .category-item {
      font-size: 12px;
      padding: 6px 8px;
    }

    .see-more-btn {
      font-size: 12px;
    }

    .apply-btn {
      font-size: 14px;
      padding: 6px 10px;
    }
  }
</style>
