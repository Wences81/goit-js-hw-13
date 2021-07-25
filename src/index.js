import './css/styles.css';
import getRefs from './js/get-refs.js';
import photoCard from './templates/card.hbs';
import PhotosApiService from './js/photos-service.js';
import axios from 'axios';
import Notiflix from "notiflix";
import LoadMoreBtn from './js/load-more-btn.js';
import SimpleLightbox from "simplelightbox";





const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
console.log(loadMoreBtn)

const photosApiService = new PhotosApiService;

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.searchQuery.value;

    if (photosApiService.query.trim() === '') {
        return  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    loadMoreBtn.show();
    photosApiService.resetPage();


    clearHitsContainer();
    // fetchHits();

    photosApiService.fetchPhotos().then(hits => {
        appendHitsMarkup(hits);
        });
}


// function fetchHits() {

//     loadMoreBtn.disable();
//     photosApiService.fetchHits().then(hits => {
//         appendHitsMarkup(hits);
//         loadMoreBtn.enable();
//     });

// }


function onLoadMore() {
    loadMoreBtn.disable();

    photosApiService.fetchPhotos().then(appendHitsMarkup);
    loadMoreBtn.enable();
    

}


    function appendHitsMarkup(hits) {
        refs.photoGallery.insertAdjacentHTML('beforeend', photoCard(hits));
    }


    function clearHitsContainer() {
        refs.photoGallery.innerHTML = '';
    }


    function getTotalImgCount() {
        refs.loadBtn.style.display = 'none';

        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
