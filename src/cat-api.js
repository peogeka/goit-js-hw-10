import axios from "axios";

const API_KEY = "live_4GomigHG7ioJUfxMGMd9VWPf3A7gHvjVvcZl4PmUJSCAWR7QycKYfdXRqYSNXVev";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}