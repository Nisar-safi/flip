// [slug]/+page.js
export async function load({ params }) {
    const response = await fetch("https://flipbackend.bitcoincash.network/v1/flipstarter/?old");
    const data = await response.json();
    console.log('data is comming old',data);
    const campaign = data.find(campaign => slugify(campaign.title) === params.slug);
  
    if (!campaign) {
      return { status: 404, error: new Error('Not found') };
    }
  
    return { campaign };
  }
  
  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  