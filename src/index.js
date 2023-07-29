import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function populateBreedSelect(breeds) {
  breeds.forEach((breed) => {
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
  if (catData.length === 0) {
    showError();
    return;
  }

  const [cat] = catData;
  const { url, breeds } = cat;

  const imgElement = document.createElement("img");
  imgElement.src = url;
  imgElement.alt = "cat image";

  catInfo.innerHTML = "";

  catInfo.appendChild(imgElement);

  if (breeds.length > 0) {
    const { name, description, temperament } = breeds[0];

    const nameElement = document.createElement("h2");
    nameElement.textContent = name;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;

    const temperamentElement = document.createElement("p");
    temperamentElement.textContent = temperament;

    catInfo.appendChild(nameElement);
    catInfo.appendChild(descriptionElement);
    catInfo.appendChild(temperamentElement);
  }

  catInfo.style.display = "block";
}

function showError() {
  error.style.display = "block";
}

toggleLoader(true);

fetchBreeds()
  .then((breeds) => {
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
    .then((catData) => {
      toggleLoader(false);
      showCatInfo(catData);
    })
    .catch(() => {
      toggleLoader(false);
      showError();
    });
});