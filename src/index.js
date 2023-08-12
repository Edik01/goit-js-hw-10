import { fetchBreeds, fetchCatByBreed } from './api/cat-api';

import SlimSelect from 'slim-select';
import './sass/index.scss';

const selectEl = document.querySelector('.breed-select');
const wrapperEl = document.querySelector('.wrapper');
const errorEl = document.querySelector('.error');
const catEl = document.querySelector('.cat-info');

const onLoad = () => {
  wrapperEl.classList.remove('is-hidden');
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
    .catch(onError)
    .finally(() => {
      wrapperEl.classList.add('is-hidden');
    });
};
window.addEventListener('load', onLoad);

function onChange(event) {
  wrapperEl.classList.remove('is-hidden');

  fetchCatByBreed(event.target.value)
    .then(({ data }) => {
      const { url, breeds } = data[0];

      const { name, description } = breeds[0];
      createCardBox(url, name, description);
    })
    .catch(onError)
    .finally(() => {
      wrapperEl.classList.add('is-hidden');
    });
}

function createCardBox(url, name, description) {
  const markup = `<div class="card">
  <div class="card-img">
    <img src="${url}" alt="cat">

  </div>
  <div class="card-info">
    <h1 class="card-title">
     ${name}
    </h1>
    <p class="card-text"$\>
     ${description}
    </p>
  </div>
</div>`;
  catEl.innerHTML = markup;
}
function onError() {
  errorEl.classList.remove('is-hidden');
  setTimeout(() => {
    errorEl.classList.add('is-hidden');
  }, 3000);
}
