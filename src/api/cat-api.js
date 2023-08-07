import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Bg0qJi76MWUwOwYfMOq0VvhLQ4KA9U1r42ZLEsmAAnNujWlSzs9Nonat3Vco2JLY';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get('breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`);
}
