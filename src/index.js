import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { loadAll } from './api/api';
import { makeMarkup } from './markup/markup';

const searchForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');
export const btnLeadMoreEl = document.querySelector('.load-more');

let currentPage = 1;
let lastPage = 0;

searchForm.addEventListener('submit', onFormSubmit);
export let inputValue = '';

async function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const inputValue = formData.get('searchQuery').trim();
  if (inputValue !== '') {
    const arrayPhotos = await loadAll(inputValue, currentPage);

    galleryBox.innerHTML = makeMarkup(arrayPhotos);
    lastPage = Math.ceil(arrayPhotos.data.totalHits / 40);

    if (arrayPhotos.data.totalHits === 0) {
      btnLeadMoreEl.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(
        `Hooray! We found ${arrayPhotos.data.totalHits} images.`
      );
    }

    currentPage = 1;
    if (currentPage === lastPage || lastPage === 0) {
      btnLeadMoreEl.classList.add('hidden');
    } else {
      btnLeadMoreEl.classList.remove('hidden');
    }
  }

  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.3,
    behavior: 'smooth',
  });
}

btnLeadMoreEl.addEventListener('click', loadMore);

async function loadMore() {
  const formData = new FormData(searchForm);
  const inputValue = formData.get('searchQuery').trim();

  const morePhotos = await loadAll(inputValue, currentPage + 1);
  currentPage = morePhotos.config.params.page;

  galleryBox.innerHTML = galleryBox.innerHTML + makeMarkup(morePhotos);

  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (currentPage === lastPage) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      {
        width: '500px',
        svgSize: '120px',
        position: 'right-bottom',
      }
    );
    btnLeadMoreEl.classList.add('hidden');

    return;
  }
}
