import fs from 'fs';
// Install with `npm install node-fetch`
import fetch from 'node-fetch';

async function generateRoutes() {
  try {
    // Fetch categories
    const response = await fetch(
      'https://flipbackend.bitcoincash.network/v1/flipstarter-category/'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories.');
    }

    const categories = await response.json();

    // Check if categories are an array and contain valid names
    if (!Array.isArray(categories)) {
      throw new Error('Invalid categories structure.');
    }

    // Generate routes for categories
    const categoryRoutes = categories
      .filter((category) => category.name) // Ensure category has a name
      .map((category) => `/Filter/${category.name}`);

    // Define the range of amounts (e.g., 1 to 2000)
    const amounts = Array.from({ length: 2000 }, (_, i) => i + 1);

    // Generate routes for amounts
    const amountRoutes = amounts.map((amount) => `/Filteramount/${amount}`);

    // Add hardcoded routes from the navbar
    const navbarRoutes = [
      '/',
      '/Category/running',
      '/Category/success',
      '/Category/expired',
      '/Category',
      '/AboutThisPage',
    ];

    // Combine all routes
    const combinedRoutes = [
      ...categoryRoutes,
      ...navbarRoutes,
      ...amountRoutes,
    ];

    // Write the routes to a JSON file
    fs.writeFileSync('./routes.json', JSON.stringify(combinedRoutes, null, 2));
    console.log('Routes generated successfully.');
  } catch (error) {
    console.error('Error generating routes:', error);

    // Log the error to a file as well for troubleshooting
    fs.writeFileSync(
      './routes.json',
      JSON.stringify({ error: error.message }, null, 2)
    );
  }
}

generateRoutes();
