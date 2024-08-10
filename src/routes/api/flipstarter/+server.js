// src/routes/api/flipstarter/+server.js
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const response = await fetch('https://flipbackend.bitcoincash.network/v1/flipstarter/');

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return json({ error: `Failed to fetch data. Status: ${response.status}` }, { status: response.status });
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Error: Response is not JSON:', contentType);
            const text = await response.text();
            console.error('Response Text:', text);
            return json({ error: 'Response is not JSON' }, { status: 500 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Error fetching flipstarter details:', error);
        return json({ error: 'Failed to fetch flipstarter details' }, { status: 500 });
    }
}

export async function POST({ request, url }) {
    const endpoint = url.pathname === '/api/flipstarter' 
        ? 'https://flipbackend.bitcoincash.network/v1/flipstarter/'
        : 'https://flipbackend.bitcoincash.network/v1/flipstarter-data-from-url/';
    
    try {
        const formData = await request.json();

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return json({ error: `Failed to submit data. Status: ${response.status}` }, { status: response.status });
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Error: Response is not JSON:', contentType);
            const text = await response.text();
            console.error('Response Text:', text);
            return json({ error: 'Response from backend is not JSON' }, { status: 500 });
        }

        const data = await response.json();
        return json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.error('Error submitting flipstarter details:', error);
        return json({ error: 'Failed to submit flipstarter details' }, { status: 500 });
    }
}
