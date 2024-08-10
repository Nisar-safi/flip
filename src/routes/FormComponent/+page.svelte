<script>
  let url = "";
  let campaignData = null;
  let error = null;

  // Bind these variables to the respective fields in the JSON object
  let amount = "";
  let title = "";
  let description = "";
  let status = "";
  let funded_tx = "";
  let categories = [];

  let announcements = ["", "", ""];
  let archives = [];
  let screenshots = [];

  function getAnnouncementsString() {
    return announcements.join("\n");
  }

  function handleAnnouncementsInput(event) {
    announcements = event.target.value.split("\n").map(url => url.trim()).filter(url => url);
  }

  async function handleFetch() {
    error = null;
    campaignData = null;

    if (url.trim()) {
      try {
        const formdata = new FormData();
        formdata.append("url", url);

        const response = await fetch("https://flipbackend.bitcoincash.network/v1/flipstarter-data-from-url/", {
          method: "POST",
          body: formdata,
        });

        if (response.ok) {
          const data = await response.json();
          campaignData = data.campaign;

          // Initialize the input fields with fetched data
          amount = campaignData.amount /100000000 || "";
          title = campaignData.title || "";
          description = campaignData.description || "";
          status = campaignData.status || "";
          funded_tx = campaignData.funded_tx || "";
          categories = campaignData.categories || [];
          announcements = (campaignData.announcements || []).map(a => a.url).concat(["", "", ""]).slice(0, 3);
          archives = (campaignData.archives || []).map(a => a.url);
          screenshots = (campaignData.screenshots || []).map(s => s.url);
        } else {
          error = `Error fetching data: ${response.statusText}`;
        }
      } catch (err) {
        error = `Error fetching data: ${err.message}`;
      }
    } else {
      error = "Please enter a valid URL.";
    }
  }

  async function handleReview() {
    if (campaignData) {
      try {
        // Prepare the data with the updated values
        const updatedCampaignData = {
          amount,
          title,
          description,
          url: campaignData.url,
          status,
          funded_tx,
          categories: categories.map(cat => ({ name: cat })),
          announcements: announcements.map(url => ({ url })),
          archives: archives.map(url => ({ url })),
          screenshots: screenshots.map(url => ({ url }))
        };

        const response = await fetch("https://flipbackend.bitcoincash.network/v1/flipstarter/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCampaignData),
        });

        if (response.ok) {
          error = "Campaign data sent for review!";
        } else {
          error = `Failed to send for review: ${response.statusText}`;
        }
      } catch (err) {
        error = `Failed to send for review: ${err.message}`;
      }
    } else {
      error = "No campaign data to send. Please fetch the campaign data first.";
    }
  }
</script>

<main class="section">
  <div class="container">
    <h1 class="title">Fetch Specific Campaign Data</h1>

    <div class="box">
      <div class="field">
        <label class="label" for="url">Campaign URL</label>
        <div class="control">
          <input
            class="input"
            type="text"
            bind:value={url}
            placeholder="Enter campaign URL"
          />
        </div>
      </div>

      <div class="control">
        <button class="button is-primary" on:click={handleFetch}>Fetch Data</button>
      </div>
    </div>

    {#if error}
      <div class="notification is-danger">{error}</div>
    {/if}

    {#if campaignData}
      <div class="box">
        <div class="field">
          <label class="label" for="amount">Amount of BCH requested by campaign</label>
          <div class="control">
            <input
              class="input"
              type="number"
              id="amount"
              bind:value={amount}
              placeholder="0.00"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="title">Title of flipstarter</label>
          <div class="control">
            <input
              class="input"
              type="text"
              id="title"
              bind:value={title}
              placeholder="Enter the title"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="description">Description (short snippet from campaign site)</label>
          <div class="control">
            <textarea
              class="textarea"
              id="description"
              bind:value={description}
              placeholder="Enter a short description"
            ></textarea>
          </div>
        </div>

     

        <div class="field">
          <label class="label" for="categories">Categories (hold CTRL/Option key to select multiple)</label>
          <div class="control">
            <div class="select is-multiple">
              <select
                multiple
                bind:value={categories}
                size="4"
                class="custom-select"
                id="categories"
              >
                {#each  [
                  { name: "Web3" },
                  { name: "License-UNKNOWN" },
                  { name: "Travel" },
                  { name: "Random" },
                  { name: "SocialMedia" },
                  { name: "Hardware" },
                  { name: "Informative" },
                  { name: "Education" },
                  { name: "License-Proprietary" },
                  { name: "SLP" },
                  { name: "License-MPL2" },
                  { name: "Infrastructure" },
                  { name: "Marketing" },
                  { name: "SCAM?" },
                  { name: "Crowdfunding" },
                  { name: "Adoption" },
                  { name: "License-Apache2" },
                  { name: "Usecase" },
                  { name: "Wallet" },
                  { name: "VideoGame" },
                  { name: "Humanitarian" },
                  { name: "License-MIT" },
                  { name: "License-GPLv3" },
                  { name: "Hackathon" },
                  { name: "Healthcare" },
                  { name: "Documentary" },
                  { name: "News" },
                  { name: "Rewards" },
                  { name: "License-AGPLv3" },
                  { name: "Charity" },
                  { name: "Developer" },
                  { name: "Gaming" },
                  { name: "NFT" },
                  { name: "Software" },
                  { name: "Video" },
                  { name: "Remittance" },
                  { name: "Other" },
                  { name: "SmartBCH" },
                  { name: "DeFi" }
                ] as category}
                  <option value={category.name}>{category.name}</option>
                {/each}
              </select>
              <p>Selected categories: {categories.join(", ")}</p>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="announcements">Announcements URLs</label>
          <div class="control">
            <textarea
              class="textarea"
              id="announcements"
              value={getAnnouncementsString()}
              on:input={handleAnnouncementsInput}
              placeholder="Enter announcement URLs, one per line"
            ></textarea>
          </div>
        </div>


        

        <div class="control">
          <button class="button is-primary" on:click={handleReview}>Send for Review</button>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  /* Add your custom styles here */
  .custom-select {
    max-height: 200px;
  }
</style>
