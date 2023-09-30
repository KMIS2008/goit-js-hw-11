const gallery = document.querySelector('.gallery');

export function renderCardImage(images){
    const markcupCard = images.hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        
        return `
 <div  class="card" >  
  <div class'image-gallery'>
    <a 
      class="gallery__link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" width="200" loading="lazy" />
    </a>
  </div>
 
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div> 
</div>`;
      }
    )
    .join('');

gallery.insertAdjacentHTML('beforeend', markcupCard);

}