<script>
  export let data;
  const { campaign } = data;
</script>

<main>
  <section class="section mt-6">
    <div class="container">
      <div class="card">
        <p class="card-header-title">
          <span class="icon"><i class="fas fa-fire"></i></span>
          {campaign.title}
        </p>

        <div class="card-content is-centered column is-full">
          <div class="content">
            <p>
              <strong
                ><span class="icon"><i class="fas fa-coins"></i></span> Amount:</strong
              >
              <strong> {campaign.amount} BCH</strong>
            </p>
            <p>
              <strong
                ><span class="icon"><i class="fas fa-align-left"></i></span> Description:</strong
              >
              {campaign.description}
            </p>

            <div>
              <strong
                ><span class="icon"><i class="fas fa-tags"></i></span> Category:</strong
              >
              {#each campaign.category as Categories}
                <span class="tag is-info m-1"
                  ><span class="icon"><i class="fas fa-tag"></i></span>
                  {Categories}</span
                >
              {/each}
            </div>
            <p class="mt-2">
              <strong
                ><span class="icon"><i class="fas fa-info-circle"></i></span> Status:</strong
              >
              {campaign.status}
            </p>
            <p>
              <strong>
                <span class="icon">
                  <i class="fas fa-handshake"></i>
                </span> Transaction:
              </strong>
              <a
                class="is-flex-wrap-wrap"
                href={`https://explorer.bitcoin.com/bch/tx/${campaign.tx}`}
                target="_blank">
                {campaign.tx}
              </a>
            </p>
            
            <p>
              <strong
                ><span class="icon"><i class="fas fa-link"></i></span> URL:</strong
              > <a href={campaign.url} target="_blank">{campaign.url}</a>
            </p>

            <div class="buttons mt-3" style="margin-bottom: 0.2rem; padding-bottom: 0rem">
              <p>
                <strong>
                  <span class="icon mr-1"><i class="fas fa-bullhorn"></i></span
                  >View Announcement:</strong
                >
              </p>
              {#each campaign.announcement as announcementt, index (announcementt)}
                <a class=" mb-3" href={announcementt} target="_blank"
                  >#{index+1}
                </a>
              {/each}
            </div>

            <div class="is-flex ">
              <div>
                <strong
                  ><span class="icon"><i class="fas fa-archive"></i></span
                  >Archive:</strong
                >
              </div>
              {#each campaign.archive as archiv, index (archiv)}
                <a href={archiv} class="is-link ml-2" target="_blank">
                  #{index +1}
                </a>
              {/each}
            </div>
          </div>

          <div
            class="mt-3 is-flex is-justify-content-center is-align-items-center"
          >
            <a class="button is-primary" href={campaign.url} target="_blank">
              <span class="icon mr-1">
                <i class="fas fa-external-link-alt"></i>
              </span>
              Visit Campaign
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  .icon {
    margin-right: 0.5rem; /* Adjust spacing as needed */
  }
  
</style>
