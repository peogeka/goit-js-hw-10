import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_fwIQ0QcC8AuWHMcy6B6OLEXyaOpxUeIePhpPZ3fmZzcoLOUaCEuDr8CLgwAg0qkX';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}
