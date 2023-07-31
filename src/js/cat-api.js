import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY =
  'live_omqbOdoN1Rkji1OYrVpfWeIs9WYzrLih1emeur1V3kPQGDKSITbKR0LMlLbxAS6m';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const BASE_URL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error(error.message);
      Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!',
        {
          position: 'center-center',
          timeout: 1000,
          width: '700px',
          fontSize: '24px',
        }
      );
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error.message);
      Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!',
        {
          position: 'center-center',
          timeout: 1000,
          width: '700px',
          fontSize: '24px',
        }
      );
    });
}
