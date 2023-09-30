import Notiflix from 'notiflix';
import { lightboxImages } from "./simplelightbox";

import { fetchImages } from './request';
import { renderCardImage } from './cardImages';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

 let page = 1;
 const pageLimit = 40;
 

//  Плавний скрол
 document.addEventListener('scroll', scroll);
 function scroll (){
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
 };


 btnLoadMore.classList.add('is-hidden');

console.log(btnLoadMore);

form.addEventListener('submit', chooseImages);

function chooseImages (event) {
    event.preventDefault();
    clearGallery();
    page = 1;

    let namePhoto = event.target.elements.searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');

    if(namePhoto === ''){
       return  Notiflix.Notify.failure(
            'Please, enter your search query.'
          )
    }

    fetchImages(namePhoto, page, pageLimit)
    .then(images => {
    console.log(images);

    if(images.totalHits === 0){

        form.reset(); 
        return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          )
    }

    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);

    renderCardImage(images);

    lightboxImages.refresh();

    btnLoadMore.classList.remove('is-hidden');

})
.catch(error => 
    Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
);
};

btnLoadMore.addEventListener('click', loadMore);

function loadMore (event){
    event.preventDefault();
 
    clearGallery();

    btnLoadMore.classList.add('is-hidden');

    page +=1;

    let namePhoto = input.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');

    fetchImages(namePhoto, page, pageLimit)
    .then(images => {
    console.log(images);

    const number = Number(page*images.hits.length);
    console.log(number);

    if(number > images.totalHits || number === 0){

         btnLoadMore.classList.add('is-hidden');
         clearGallery();
         return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");

  }
    
    Notiflix.Notify.success(`Hooray! We found ${Number(images.hits.length)} images.`);

    renderCardImage(images);

    lightboxImages.refresh();
    
    btnLoadMore.classList.remove('is-hidden');

   scroll();
}) 
    
}

function clearGallery(){
    gallery.innerHTML = '';
}

