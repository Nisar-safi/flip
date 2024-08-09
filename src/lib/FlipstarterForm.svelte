<script>
  let url = "";
  let bchRequested = "";
  let flipstarterTitle = "";
  let description = "";
  let categories = [];
  let announcements = [];
  let newAnnouncement =
    "";

  async function loadFlipstarterDetails() {
    try {
      const res = await fetch(
        `/api/flipstarter?url=${encodeURIComponent(url)}`
      );
      const data = await res.json();
      if (res.ok) {
        bchRequested = data.bchRequested || "";
        flipstarterTitle = data.flipstarterTitle || "";
        description = data.description || "";
        categories = data.categories || [];
      } else {
        console.error("Failed to load details:", data);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }

  function addAnnouncement() {
    if (newAnnouncement.trim()) {
      announcements = [...announcements, newAnnouncement.trim()];
      newAnnouncement = ""; 
    }
  }

  async function submitForm() {
    try {
      const res = await fetch("/api/flipstarter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bchRequested,
          flipstarterTitle,
          description,
          categories,
          announcements,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Failed to submit form:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
</script>

<form on:submit|preventDefault={submitForm} class="box">
  <div class="field">
    <label class="label" for="flipstarter-url">Flipstarter URL</label>
    <div class="control">
      <input
        class="input"
        type="url"
        id="flipstarter-url"
        bind:value={url}
        placeholder="Enter the flipstarter URL here"
      />
    </div>
    <div class="control">
      <button
        class="button is-primary mt-2"
        type="button"
        on:click={loadFlipstarterDetails}>Load flipstarter details</button
      >
    </div>
  </div>

  <div class="field">
    <label class="label" for="bch-requested"
      >Amount of BCH requested by campaign</label
    >
    <div class="control">
      <input
        class="input"
        type="number"
        id="bch-requested"
        bind:value={bchRequested}
        placeholder="0.00"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="flipstarter-title">Title of flipstarter</label>
    <div class="control">
      <input
        class="input"
        type="text"
        id="flipstarter-title"
        bind:value={flipstarterTitle}
        placeholder="Enter the title"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="description"
      >Description (short snippet from campaign site)</label
    >
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
    <label class="label" for="categories"
      >Categories (hold CTRL/Option key to select multiple)</label
    >
    <div class="control">
      <div class="select is-multiple">
        <select
          multiple
          bind:value={categories}
          size="4"
          class="custom-select"
          id="categories"
        >
          <option value="Web3">Web3</option>
          <option value="License-UNKNOWN">License-UNKNOWN</option>
          <option value="Travel">Travel</option>
          <option value="Random">Random</option>
          <option value="SocialMedia">SocialMedia</option>
          <option value="Hardware">Hardware</option>
          <option value="Informative">Informative</option>
          <option value="Education">Education</option>
          <option value="License-Proprietary">License-Proprietary</option>
          <option value="SLP">SLP</option>
          <option value="License-MPL2">License-MPL2</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Marketing">Marketing</option>
          <option value="SCAM?">SCAM?</option>
          <option value="Crowdfunding">Crowdfunding</option>
          <option value="Adoption">Adoption</option>
          <option value="License-Apache2">License-Apache2</option>
          <option value="Usecase">Usecase</option>
          <option value="Wallet">Wallet</option>
          <option value="VideoGame">VideoGame</option>
          <option value="Humanitarian">Humanitarian</option>
          <option value="License-MIT">License-MIT</option>
          <option value="License-GPLv3">License-GPLv3</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Documentary">Documentary</option>
          <option value="News">News</option>
          <option value="Rewards">Rewards</option>
          <option value="License-AGPLv3">License-AGPLv3</option>
          <option value="Charity">Charity</option>
          <option value="Developer">Developer</option>
          <option value="Gaming">Gaming</option>
          <option value="NFT">NFT</option>
          <option value="Software">Software</option>
          <option value="Video">Video</option>
          <option value="Remittance">Remittance</option>
          <option value="Other">Other</option>
          <option value="SmartBCH">SmartBCH</option>
          <option value="DeFi">DeFi</option>
        </select>
        <p>Selected categories: {categories.join(", ")}</p>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label" for="announcements"
      >Posts about this flipstarter (announcements)</label
    >
    <div class="control">
      <input
        class="input"
        type="url"
        id="announcements"
        bind:value={newAnnouncement}
        placeholder="Add a new announcement"
      />
    </div>
    <div class="control">
      <button class="button is-success" type="button" on:click={addAnnouncement}
        >Add announcement</button
      >
    </div>
    <ul>
      {#each announcements as announcement}
        <li>{announcement}</li>
      {/each}
    </ul>
  </div>

  <div class="field">
    <div class="control">
      <button class="button is-info" type="submit">Submit for review</button>
    </div>
  </div>
</form>

<style>
  form {
    max-width: 900px;
    margin: 0 auto;
  }
  .field {
    margin-bottom: 1.5rem;
  }
</style>
