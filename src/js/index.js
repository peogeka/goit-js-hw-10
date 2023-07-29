import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  Notiflix.Notify.warning(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function hideError() {
  error.style.display = 'none';
}

function showCatInfo(cat) {
  catInfo.innerHTML = createMarkup(cat);
  catInfo.style.display = 'block';
}

function createMarkup(arr) {
  return arr
    .map(
      ({ url, breeds: [{ name, description, temperament }] }) => `
        <img class="cat-img" src="${url}" alt="${name}" />
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament">${temperament}</p>
      `
    )
    .join('');
}

function hideCatInfo() {
  catInfo.innerHTML = '';
  catInfo.style.display = 'none';
}

function selectBreed(breeds) {
  new SlimSelect({
    select: breedSelect,
    data: breeds.map(({ id, name }) => ({ value: id, text: name })),
  });
}

function handlerSearch() {
  const breedId = breedSelect.value;

  if (breedId) {
    hideCatInfo();
    showLoader();

    fetchCatByBreed(breedId)
      .then(cat => {
        hideLoader();
        showCatInfo(cat);
      })
      .catch(error => {
        hideLoader();
        showError();
      });
  } else {
    hideCatInfo();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showLoader();
  hideError();

  fetchBreeds()
    .then(breeds => {
      hideLoader();
      selectBreed(breeds);
      breedSelect.addEventListener('change', handlerSearch);
    })
    .catch(error => {
      hideLoader();
      hideError();
      showError();
    });
});
