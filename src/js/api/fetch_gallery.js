import axios from "axios"
export default async function fetchGallery(name, page) {

    const apiKey = '28349117-93ec80a92256e0e2caaa1ba86'
    const response = await axios({
        
        url: 'https://pixabay.com/api/',
        params: {
            
            key: apiKey,
            q: name,
            orientation: 'horizontal',
            image_type: 'photo',
            safesearch: true,
            page: page,
            per_page: 40
        }

    }
    )
    console.log(response);
    // const res = await response.json();
    return response
}





