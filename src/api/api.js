import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '37322258-fbe2dcb7b76c85722debd51ee';

export async function loadAll(inputValue, page) {
  try {
    return await axios.get(URL, {
      params: {
        key: KEY,
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
