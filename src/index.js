import { fetchBreeds, fetchCatByBreed } from './api/cat-api';

import SlimSelect from 'slim-select';
import './sass/index.scss';

const selectEl = document.querySelector('.breed-select');

const loaderEl = document.querySelector('.loader');

const errorEl = document.querySelector('.error');

const catEl = document.querySelector('.cat-info');

const onLoad = () => {
  fetchBreeds()
    .then(({ data }) => {
      const options = data.map(({ id, name }) => ({
        text: name,
        value: id,
      }));

      new SlimSelect({
        select: selectEl,
        data: options,
      });
      selectEl.addEventListener('change', onChange);
    })
    .catch(error => {
      console.log(error);
    });
};
window.addEventListener('load', onLoad);

function onChange(event) {
  fetchCatByBreed(event.target.value)
    .then(({ data }) => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}

function createCardBox() {
  const marckup = `<div class="card">
  <div class="card-img">
    <img src="" alt="cat">

  </div>
  <div class="card-info">
    <h1 class="card-title">
     
    </h1>
    <p class="card-text">
     
    </p>
  </div>
</div>`;
  catEl.innerHTML = marckup;
}
