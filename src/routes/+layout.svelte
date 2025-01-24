<script>
  import "bulma/css/bulma.min.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
import Navebar from "$lib/Components/Navebar.svelte";
import { onMount } from "svelte";
let deferredPrompt;
let showInstallButton = false;

onMount(() => {
  // Listen for the `beforeinstallprompt` event
  window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault(); 
	deferredPrompt = e; 
	showInstallButton = true; 
  });
})
async function installPWA() {
  if (deferredPrompt) {
	deferredPrompt.prompt();
	const { outcome } = await deferredPrompt.userChoice; 
	if (outcome === 'accepted') {
	  console.log('PWA installed');
	} else {
	  console.log('PWA installation dismissed');
	}
	deferredPrompt = null; 
	showInstallButton = false; 
  }
}

</script>

{#if showInstallButton}
  <button on:click={installPWA} id="install-button">
    Install App
  </button>
{/if}
<Navebar />

<slot></slot>

<style>
	#install-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: #ff3f20;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999; /* Ensure the button is always on top */
}

#install-button:hover {
  background-color: #ff5722;
}
</style>
