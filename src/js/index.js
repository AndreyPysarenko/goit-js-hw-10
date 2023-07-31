// import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const ref = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),

  catInfo: document.querySelector('.cat-info'),
};

setTimeout(() => {
  ref.breedSelect.style.display = 'flex';
}, 1000);
setTimeout(() => {
  onFetchError();
}, 1000);

fetchBreeds()
  .then(breeds => {
    const markupOption = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    ref.breedSelect.innerHTML = markupOption;
  })
  .catch(() => {
    onFetchError();
  });

ref.breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  ref.loader.style.display = 'block';
  setTimeout(() => {
    onFetchError();
  }, 500);

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(breed => {
      onFetchError();
      onBreedsSearch(breed);
    })
    .catch(() => {
      onFetchError();
    });
}

function onBreedsSearch(breed) {
  ref.catInfo.innerHTML = '';
  const { breeds, url } = breed[0];
  const { name, description, temperament } = breeds[0];
  const markup = `<div class="cat-container">
<img src="${url}" alt="${name}" width='400'>
<div class="text">
<h1>${name}</h1>
<p>${description}</p>
<p><b>Temperament:</b> ${temperament}</p>
</div>

</div>`;
  ref.catInfo.innerHTML = markup;
}

function onFetchError() {
  ref.loader.style.display = 'none';
}
