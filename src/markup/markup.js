export function makeMarkup(arrayPhotos) {
  return arrayPhotos.data.hits
    .map(photo => {
      return `
          <a href="${photo.largeImageURL}">
            <div class="photo-card container-inner">
              <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes<br></b>${photo.likes}
                </p>
                <p class="info-item">
                  <b>Views<br></b>${photo.views}
                </p>
                <p class="info-item">
                  <b>Comments<br></b>${photo.comments}
                </p>
                <p class="info-item">
                  <b>Downloads<br></b>${photo.downloads}
                </p>
              </div>
            </div>
          </a>
      `;
    })
    .join('');
}
