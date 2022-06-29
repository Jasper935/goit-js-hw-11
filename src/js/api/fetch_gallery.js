import axios from "axios"
export default function fetchGallery(name, page){
//     const url ='https://pixabay.com/api'
   const apiKey = '28349117-93ec80a92256e0e2caaa1ba86'
//     const filters = `q=${name}&image_type=photo&page=${page}`
   return axios({
     url: 'https://pixabay.com/api',
    params:{
        key: apiKey,
        q: name,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
        page: page,
        per_page: 40
    }

   }
//    (`${url}?${apiKey}&${filters}`)
//    .then(res=>{ 
    // if (res.ok) {
        
    //     return res.json()
        
    // }
    
// }
)
// .catch(error=>
//     console.log(error))

}









// import SimpleLightbox from "simplelightbox";
// // Дополнительный импорт стилей
// import "simplelightbox/dist/simple-lightbox.min.css";