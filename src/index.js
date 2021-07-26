import './sass/main.scss';
import getRefs from './js/get-refs.js';
import photoCard from './templates/card.hbs';
import PhotosApiService from './js/photos-service.js';
import Notiflix from "notiflix";
import SimpleLightbox from 'simplelightbox'




const gallery = new SimpleLightbox('.photo-card a');

const refs = getRefs();

// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });
// console.log(loadMoreBtn)

// const photosApiService = new PhotosApiService;

// refs.searchForm.addEventListener('submit', onSearch);
// // refs.loadMoreBtn.addEventListener('click', onLoadMore);
// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


// async function onSearch(e) {
//     e.preventDefault();

//     photosApiService.query = e.currentTarget.elements.searchQuery.value;

//     if (photosApiService.query.trim() === '') {
//         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     } 

    

//     loadMoreBtn.show();
//     photosApiService.resetPage();
//     clearHitsContainer();
//     // fetchHits();

//     photosApiService.fetchPhotos().then(hits => {
//         appendHitsMarkup(hits);
//     });


// }




// async function onLoadMore() {
//     const result =  await  photosApiService.fetchPhotos();

//     if (refs.photoGallery.querySelectorAll('.photo-card').length >= result.totalHits) {
//            getTotalImgCount()
//     } else {
//         appendHitsMarkup(result.hits)
//     }

//     loadMoreBtn.disable();
//     photosApiService.fetchPhotos().then(appendHitsMarkup);
//     loadMoreBtn.enable();


// }


// function appendHitsMarkup(hits) {
//     refs.photoGallery.insertAdjacentHTML('beforeend', photoCard(hits));
// }


// function clearHitsContainer() {
//     refs.photoGallery.innerHTML = '';
// }


// function getTotalImgCount() {
   

//     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
// }













const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onImgSearch);
refs.loadMoreBtn.addEventListener('click', onImgLoad);



async function onImgSearch(evt) {
  evt.preventDefault();
  photosApiService.resetPage();
  clearImgBox();
 
  refs.loadMoreBtn.classList.add('hidden');

  photosApiService.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();

  if (photosApiService.searchQuery === '') {
    return;
  }
 
    
    
  try {
    const result = await photosApiService.fetchPhotos();

    ImgMarkup(result.hits);

    if (result.hits.length === 0) {
      refs.loadMoreBtn.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    

    refs.loadMoreBtn.classList.remove('hidden');
  } catch (error) {
    console.log(error);
  }
}

async function onImgLoad() {
  try {
    const result = await photosApiService.fetchPhotos();
    

    if (refs.photoGallery.querySelectorAll('.photo-card').length === result.totalHits) {
      getTotalImgCount();
    } else {
      ImgMarkup(result.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

function ImgMarkup(data) {
  refs.photoGallery.insertAdjacentHTML('beforeend', photoCard(data));
}

function clearImgBox() {
  refs.photoGallery.innerHTML = '';
}

function getTotalImgCount() {
  refs.loadMoreBtn.style.display = 'none';

  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}