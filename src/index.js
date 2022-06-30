import fetchGallery from "./js/api/fetch_gallery";
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form')
form.addEventListener('submit', onSubmit)
const target = document.querySelector('.target');
const div = document.querySelector('.gallery')
let queryInput = ''
let page = 1;
const options = {
    root: null,
    rootMargin: '400px',
    threshold: 1.0,
};
const observer = new IntersectionObserver(updateCards, options);

function updateCards(entries) {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            fetchGallery(queryInput, page).then(res => {
                if (res.data.hits.length === 0) {
                    Notiflix.Notify.failure(`Were sorry, but yo'uve reached the end of search results.`)
                    observer.unobserve(target)
                    return

                }
                createMarkUp(res)
            });
        }
    });
    //"We're sorry, but you've reached the end of search results."
}

function onSubmit(evt) {
    evt.preventDefault()
    queryInput = evt.target.searchQuery.value
    if (!queryInput) {
        Notiflix.Notify.failure('Enter any value!')
        return
    }
    page = 1
    observer.unobserve(target)
    div.innerHTML = ''


    fetchGallery(queryInput, page).then(res => {
        createMarkUp(res)
        observer.observe(target)

        if (res.data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again')
            observer.unobserve(target)
            div.innerHTML = ''
        } else if (res.data.totalHits.length <= 40){
            observer.unobserve(target)
            Notiflix.Notify.success(`Hooray! We found ${res.data.total} images.`);
            Notiflix.Notify.failure(`Were sorry, but yo'uve reached the end of search results.`)
        }
        else {
            Notiflix.Notify.success(`Hooray! We found ${res.data.total} images.`);
        }
    }).catch(err => console.log(err))
}

function createMarkUp(res) {
    // console.log();

    const markUp = res.data.hits.map(el =>
        `<div class="photo-card">
    <a href="${el.largeImageURL}">
    <img src='${el.webformatURL}' alt="${el.tags}" loading="lazy" width='200' />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${el.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${el.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${el.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${el.downloads}</b>
      </p>
    </div>
    </div>`).join('')
    console.log(markUp);
    div.insertAdjacentHTML('beforeend', markUp)
    const lightbox = new SimpleLightbox('.gallery a', { /* options */ });

}

