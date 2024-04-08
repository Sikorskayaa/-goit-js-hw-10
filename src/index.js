import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

function catBreeds(data) {
  fetchBreeds(data)
    .then(data => {
      //   console.log(data);
      loaderElement.classList.replace('loader', 'is-hidden');

      let optionMarkup = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });

      breedSelectElement.insertAdjacentHTML('beforeend', optionMarkup);
      breedSelectElement.classList.remove('is-hidden'); // Show select element after
    })
    .catch(onError);
}

catBreeds();

const createMarkup = e => {
  loaderElement.classList.replace('is-hidden', 'loader');
  breedSelectElement.classList.add('is-hidden');
  catInfoElement.classList.add('is-hidden');

  const breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loaderElement.classList.replace('loader', 'is-hidden');
      breedSelectElement.classList.remove('is-hidden');

      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoElement.innerHTML = `
      <img src="${url}" alt="${name}" width="400"/>
      <div class="box">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
      `;
      catInfoElement.classList.remove('is-hidden');
    })
    .catch(onError);
};

breedSelectElement.addEventListener('change', createMarkup);

function onError() {
  errorElement.classList.remove('is-hidden');
  breedSelectElement.classList.add('is-hidden');
}
