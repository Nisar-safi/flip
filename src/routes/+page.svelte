<script>


  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  
  function prependBase(url) {
    if (!url.startsWith('http') && !url.startsWith('https') && !url.startsWith(base)) {
      return `${base}${url}`;
    }
    return url;
  }
  
  function navigate() {
    goto(prependBase('/FormComponent'));
  }
  </script>
  
  <section class="section">
  <div class="columns is-centered">
    <div class="column is-8">
      <div class="card">
        <div class="card-content has-text-centered">
          <h1 class="title">Flipstarters on Bitcoin Cash</h1>
          <p>
            Flipstarter provides a way for any project to engage with potential
            funders in a way that encourages accountability for projects and
            fairness for funders.
          </p>
          <p>
            This page keeps an overview of active and historical flipstarters.
          </p>
          <p>Do you know of a flipstarter that is not listed here?</p>
          <a  on:click="{navigate}" class="button is-primary mt-3">Submit a flipstarter</a>
  
          <div class="mt-5">
            <p>
              So far, <strong>134 projects</strong> have been successfully
              funded using flipstarter, receiving a total of
              <strong>15545.84 BCH</strong>.
            </p>
          </div>
  
          <div class="buttons mt-3">
            <a href="https://flipstarter.cash/en/how-to-pledge" class="button is-info mb-3">How to pledge</a>
            <a href="https://flipstarter.cash/en/how-to" class="button is-dark">Start a campaign</a>
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
  </style>
  