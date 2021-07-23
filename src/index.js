import './css/styles.css';
import getRefs from './js/get-refs.js';
import photoCard from './templates/card.hbs';
import PhotosApiService from './js/photos-service.js';
import axios from 'axios';
import Notiflix from "notiflix";


const refs = getRefs();

const photosApiService = new PhotosApiService;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.searchQuery.value;

    if (photosApiService.query.trim() === '') {
        return  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    photosApiService.resetPage();
    photosApiService.fetchPhotos().then(hits => {
        clearHitsContainer();
        appendHitsMarkup(hits);

    });
}


function onLoadMore() {
    photosApiService.fetchPhotos().then(appendHitsMarkup);
}


function appendHitsMarkup(hits) {
    refs.photoGallery.insertAdjasentHTML('beforeend', photoCard(hits));
}


function clearHitsContainer() {
    refs.photoGallery.innerHTML = '';
}