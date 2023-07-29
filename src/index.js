import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");


function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}


function toggleLoader(show) {
  loader.style.display = show ? "block" : "none";
  breedSelect.style.display = show ? "none" : "block";
}


function showCatInfo(catData) {
  const [cat] = catData;
  const { url, breeds } = cat;
  const { name, description, temperament } = breeds[0];

  const imgElement = document.createElement("img");
  imgElement.src = url;
  imgElement.alt = "Cat Image";

  const nameElement = document.createElement("h2");
  nameElement.textContent = name;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  const temperamentElement = document.createElement("p");
  temperamentElement.textContent = temperament;

  catInfo.innerHTML = "";
  catInfo.appendChild(imgElement);
  catInfo.appendChild(nameElement);
  catInfo.appendChild(descriptionElement);
  catInfo.appendChild(temperamentElement);
  catInfo.style.display = "block";
}


function showError() {
  error.style.display = "block";
}


toggleLoader(true);
fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    toggleLoader(false);
  })
  .catch(() => {
    toggleLoader(false);
    showError();
  });


breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  toggleLoader(true);
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      toggleLoader(false);
      showCatInfo(catData);
    })
    .catch(() => {
      toggleLoader(false);
      showError();
    });
});