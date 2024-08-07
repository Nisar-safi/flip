<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  let url = '';
  let message = '';

  function handleSubmit(event) {
    event.preventDefault();
    if (url) {
      console.log('Submitted URL:', url);
      message = `Successfully submitted the URL: ${url}`;
      url = ''; 
    } else {
      message = 'Please enter a URL.';
    }
  }

  function handleCancel() {
    goto(prependBase('/Flipstarters'));
  }

  function prependBase(url) {
    if (!url.startsWith('http') && !url.startsWith('https') && !url.startsWith(base)) {
      return `${base}${url}`;
    }
    return url;
  }
</script>

<section class="section">
  <div class="columns is-centered">
    <div class="column is-8">
      <div class="card">
        <div class="card-content has-text-centered">
          <h1 class="title">Flipstarter Submission Form (beta)</h1>
          <p>Submit a Flipstarter to be listed on this website.</p>
          <p>
            Thank you for helping us keep track of all Flipstarters. We accept
            submissions for both running and completed Flipstarters.
          </p>
          <form on:submit={handleSubmit}>
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Enter URL" bind:value={url} name="url" />
              </div>
            </div>
            {#if message}
              <p class="has-text-info">{message}</p>
            {/if}
            <div class="buttons mt-3">
              <button class="button is-primary" type="submit">Submit</button>
              <button class="button is-light" type="button" on:click={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .has-text-info {
    color: #3273dc; /* Bulma's primary color */
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
</style>
