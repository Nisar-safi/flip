<script>
	export let data;
	const { campaign } = data;
	console.log("data is comming from params ", data);
</script>

<main>
	<section class="section">
		<div class="container">
			<div class="columns is-centered is-multiline">
				<div class="column is-10">
					<div class="card" style="margin: 1rem;">
						<div class="card-content">
							<div class="content">
								<h1 class="title is-4">
									<span class="icon"><i class="fas fa-fire mr-3"></i></span
									>{campaign.title}
								</h1>
								<p>
									<span class="icon"><i class="fas fa-info-circle"></i></span>
									<strong>Status:</strong>
									{campaign.status}
								</p>
								<p>
									
									<span class="icon"
										><i class="fas fa-hand-holding-usd"></i></span
									><strong>Funded Transaction</strong>
									{campaign.funded_tx}
								</p>
								<h2 class="subtitle is-5">
									<span class="icon"><i class="fas fa-info"></i></span>Details
								</h2>
								<p>
									<span class="icon"><i class="fas fa-align-left"></i></span>
									<strong>Description:</strong>

									{campaign.description}
								</p>
								<p>
									<strong>
										<span class="icon"><i class="fas fa-coins"></i></span>
										Requesting:</strong
									>
									<strong> {campaign.amount / 100000000} BCH</strong>
								</p>
								<div>
									<strong
										><span class="icon"><i class="fas fa-tags"></i></span> Categories:</strong
									>
									{#each campaign.categories as category}
										<span class="tag is-info m-1"
											><span class="icon"><i class="fas fa-tag"></i></span>
											{category.name}</span
										>
									{/each}
								</div>

								<div class="buttons mt-3" id="margin">
									<p>
										<strong>
											<span class="icon mr-1"
												><i class="fas fa-bullhorn"></i></span
											>View Announcement:</strong
										>
									</p>
									{#each campaign.announcements as announcement, index (announcement)}
										<a class=" mb-2" href="{announcement.url}" target="_blank"
											>#{index + 1}
										</a>
									{/each}
								</div>

								<div class="container">
									<div class="is-flex mb-3">
										<div>
											<strong
												><span class="icon"><i class="fas fa-archive"></i></span
												>Archive Copy:</strong
											>
										</div>
										{#each campaign.archives as archive, index (archive)}
											<a
												href="{archive.url}"
												class="is-link ml-2"
												target="_blank"
											>
												#{index + 1}
											</a>
										{/each}
									</div>

									<div class="is-flex">
										<strong
											><span class="icon"><i class="fas fa-images"></i></span
											>Screenshots:</strong
										>
										{#each campaign.screenshots as screenshot, index (screenshot)}
											<p>
												<a
													href="{screenshot.image}"
													class="is-link mb-3"
													target="_blank"
													><span class="icon"><i class="fas fa-image"></i></span
													>
													#{index + 1}</a
												>
											</p>
										{/each}
									</div>
								</div>
								<div
									class="mt-3 is-flex is-justify-content-center is-align-items-center"
								>
									<a
										class="button is-primary"
										href="{campaign.url}"
										target="_blank"
									>
										<span class="icon mr-1">
											<i class="fas fa-external-link-alt"></i>
										</span>
										Visit Campaign
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	/* Custom styles to handle the truncated text */

	.icon {
		margin-right: 0.5rem;
	}
	#margin {
		padding: 0px;
		margin: 0px;
	}
</style>
