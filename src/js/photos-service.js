

// const API_KEY = '22617887-a3f68d8335d469bb4f11f2290';
// const BASE_URL = 'https://pixabay.com/api/';


// export default class PhotosApiService {

//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }


// async fetchPhotos() {
//    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&safesearch=true&orientation=horizontal&per_page=40&page=${this.page}`
    
  
    
//     return  await fetch(url)
//         .then(response => response.json())
//         .then(({ hits }) => {
//             this.incrementPage();
//             return  hits;
//         });

// }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }












const axios = require('axios');
const API_KEY = '22617887-a3f68d8335d469bb4f11f2290';
const BASE_URL = 'https://pixabay.com/api/';

export default class photosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhotos() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    const response = await axios.get(url);

    this.page += 1;
    return response.data;
  }

  resetPage() {
    this.page = 1;
  }
}
