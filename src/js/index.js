import Notiflix from 'notiflix';
import { lightboxImages } from "./simplelightbox";

import { fetchImages } from './request';
import { renderCardImage } from './cardImages';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let galleryfetch = '';
let page = 1;
const pageLimit = 40;


btnLoadMore.classList.add('is-hidden');

form.addEventListener('submit', chooseImages);

async function chooseImages (event) {
    event.preventDefault();
    clearGallery();
    btnLoadMore.classList.add('is-hidden');
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

  
       galleryfetch = await fetchImages(namePhoto, page, pageLimit);
      //  const ccc = await console.log(galleryfetch);
  
      if(galleryfetch.totalHits === 0){
  
          form.reset(); 
          return Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            )
      }
  else {
      Notiflix.Notify.success(`Hooray! We found ${galleryfetch.totalHits} images.`);
  
      renderCardImage(galleryfetch);
  
      lightboxImages.refresh();
  }
      if (galleryfetch.totalHits > pageLimit) {
        btnLoadMore.classList.remove('is-hidden');
    }
    else{
      btnLoadMore.classList.add('is-hidden');
    }

    }

//     fetchImages(namePhoto, page, pageLimit)
//     .then(images => {
//     console.log(images);

//     if(images.totalHits === 0){

//         form.reset(); 
//         return Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.'
//           )
//     }
// else {
//     Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);

//     renderCardImage(images);

//     lightboxImages.refresh();
// }
//     // btnLoadMore.classList.remove('is-hidden');
//     if (images.totalHits > pageLimit) {
//       btnLoadMore.classList.remove('is-hidden');
//       // window.addEventListener('scroll', scroll);
//   };

// })
// .catch(error => 
//     {Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page!'
//       );
//       form.resert();}
// );
// };

btnLoadMore.addEventListener('click', loadMore);

async function loadMore (event){
    event.preventDefault();

    btnLoadMore.classList.add('is-hidden');

    page +=1;

    let namePhoto = input.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');

    galleryfetch = await fetchImages(namePhoto, page, pageLimit);
    
    // const rrr = await console.log(galleryfetch);

    // const lastPage1 = Number(page*galleryfetch.hits.length);
    const lastPage = Math.ceil(galleryfetch.totalHits / pageLimit);
    
    // console.log(`${page} * ${galleryfetch.hits.length} = ${lastPage1}`);
    //  console.log(`${galleryfetch.totalHits} / ${pageLimit} = ${lastPage}`);

    //  && lastPage1 === galleryfetch.totalHits || lastPage1 === 0
  
      if(  page === lastPage){

        renderCardImage(galleryfetch);
        lightboxImages.refresh();

         btnLoadMore.classList.add('is-hidden');
        
        //  btnLoadMore.removeEventListener('click', loadMore );
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results."); 
  }
  //     if( pageLimit > galleryfetch.hits.length){

  //       renderCardImage(galleryfetch);
  //       lightboxImages.refresh();
  //       btnLoadMore.classList.add('is-hidden');
  //       // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  // }
      else{

    renderCardImage(galleryfetch);

    lightboxImages.refresh();

    btnLoadMore.classList.remove('is-hidden');
  }
} 
    
function clearGallery(){
    gallery.innerHTML = '';
}


//  Плавний скрол
//  window.addEventListener('scroll', scroll);
//  function scroll (){
//     const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: "smooth",
//   });
//  };





//     fetchImages(namePhoto, page, pageLimit)
//     .then(images => {
//     console.log(images);

//     const number = Number(page*images.hits.length);
//     // const number = Math.ceil(images.totalHits / pageLimit);
//     console.log(number);

//     renderCardImage(images);
    
//     if( number === images.totalHits || number === 0){

//          btnLoadMore.classList.add('is-hidden');
//          clearGallery();
//         //  window.removeEventListener('scroll', scroll);
//          btnLoadMore.removeEventListener('click', loadMore );
//           Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        
//   }
    
//     Notiflix.Notify.success(`Hooray! We found ${Number(images.hits.length)} images.`);

//     lightboxImages.refresh();
    
//     // btnLoadMore.classList.remove('is-hidden');

//   //  scroll();
// }) 
    
// }



