<script>
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { browser } from '$app/environment';

    // Generate valid min and max values
    let validMinValues = [];
    let validMaxValues = [];

    for (let i = 1; i < 981; i += 10) {
        validMinValues.push(i);
    }
    for (let i = 11; i <= 1001; i += 10) {
        validMaxValues.push(i);
    }

    // Function to find the closest valid value
    function findClosestValid(value, validValues) {
        return validValues.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
    }

    // Retrieve stored values from localStorage or set defaults
    let minAmount = browser ? findClosestValid(parseFloat(localStorage.getItem('minAmount')) || 1, validMinValues) : 1;
    let maxAmount = browser ? findClosestValid(parseFloat(localStorage.getItem('maxAmount')) || 11, validMaxValues) : 11;

    let displayMin = minAmount;
    let displayMax = maxAmount;

    function updateMin(event) {
        let value = parseFloat(event.target.value);
        minAmount = findClosestValid(value, validMinValues);

        if (minAmount >= maxAmount - 10) {
            minAmount = maxAmount - 10;
        }

        displayMin = minAmount;
        if (browser) localStorage.setItem('minAmount', minAmount);
    }

    function updateMax(event) {
        let value = parseFloat(event.target.value);
        maxAmount = findClosestValid(value, validMaxValues);

        if (maxAmount <= minAmount + 10) {
            maxAmount = minAmount + 10;
        }

        displayMax = maxAmount;
        if (browser) localStorage.setItem('maxAmount', maxAmount);
    }

    function applyFilter() {
        goto(`${base}/Filteramount/${minAmount}/${maxAmount}`);
    }
</script>

<div class="filter-container">
    <h1 class="title has-text-centered mt-4">Campaigns Filter by Amount</h1>
    <div class="values mb-4">₿{displayMin} – ₿{displayMax}</div>

    <div class="slider-container">
        <input 
            type="range" 
            min="1" 
            max="991" 
            step="10" 
            bind:value={minAmount} 
            on:input={updateMin} 
            class="slider range-min" 
        />
        <input 
            type="range" 
            min="11" 
            max="1001" 
            step="10" 
            bind:value={maxAmount} 
            on:input={updateMax} 
            class="slider range-max" 
        />
    </div>

    <button class="button is-primary" on:click={applyFilter}>Go</button>
   
</div>

<style>
    /* Previous unchanged styles */
    .filter-container {
        width: 100%;
        max-width: 800px;
        padding: 1rem;
        border-radius: 8px;
        margin: 20px auto;
        text-align: center;
        box-shadow: 0px 0px 10px none;
        animation: fadeIn 1s forwards;
    }

    .values {
        font-size: 1.1rem;
        font-weight: bold;
        color: #006666;
        transition: color 0.3s ease;
    }

    .slider-container {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: auto;
        height: 30px;
    }

    .slider {
        position: absolute;
        
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 6px;
        background: transparent;
        border-radius: 10px;
        cursor: pointer;
        top: 0;
        left: 0;
    }

    /* WebKit (Chrome/Safari/Opera) */
    .slider::-webkit-slider-runnable-track {
        background: #007777;
        height: 6px;
        border-radius: 10px;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        background: white;
        border: 2px solid #007777;
        border-radius: 50%;
        box-shadow: 0px 0px 4px rgba(0, 183, 183, 0.4);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.3s ease;
        position: relative;
        top: -6px;
        z-index: 10;
    }

    /* Firefox */
    .slider::-moz-range-track {
        background: #007777;
        height: 6px;
        border-radius: 10px;
    }

    .slider::-moz-range-thumb {
        
        width: 18px;
        height: 18px;
        background: white;
        border: 2px solid #007777;
        border-radius: 50%;
        box-shadow: 0px 0px 4px rgba(0, 183, 183, 0.4);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.3s ease;
        z-index: 99;
    }

    /* Interactive states for WebKit */
    .slider:hover::-webkit-slider-thumb {
        background: radial-gradient(circle, #ffffff, #00b3b3);
        box-shadow: 0px 0px 10px rgba(0, 183, 183, 0.8);
    }

    .slider:active::-webkit-slider-thumb {
        transform: scale(1.2);
        box-shadow: 0px 0px 20px rgba(0, 183, 183, 1);
    }

    .slider:focus::-webkit-slider-thumb {
       
        transform: scale(1.4);
        box-shadow: 0px 0px 20px rgba(0, 183, 183, 0.8);
    }

    .slider:focus:active::-webkit-slider-thumb {
        transform: scale(1.5);
    }

    /* Interactive states for Firefox */
    .slider:hover::-moz-range-thumb {
        background: radial-gradient(circle, #ffffff, #00b3b3);
        box-shadow: 0px 0px 10px rgba(0, 183, 183, 0.8);
    }

    .slider:active::-moz-range-thumb {
        transform: scale(1.2);
        box-shadow: 0px 0px 20px rgba(0, 183, 183, 1);
    }

    .slider:focus::-moz-range-thumb {
        transform: scale(1.4);
        box-shadow: 0px 0px 20px rgba(0, 183, 183, 0.8);
    }

    .slider:focus:active::-moz-range-thumb {
        transform: scale(1.5);
    }

    /* Rest of the unchanged styles */
    .button.is-primary {
        margin-top: 10px;
        padding: 6px 12px;
        font-size: 1rem;
        font-weight: bold;
        background: #007777;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
    }

    .button.is-primary:hover {
        background: #005555;
        transform: scale(1.1);
    }

    .button.is-primary:active {
        transform: scale(0.95);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>