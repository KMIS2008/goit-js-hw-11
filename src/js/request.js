import axios from "axios";
// const axios = require('axios');

const API_KEY = '39644186-d60e3e2f5d0cd6a0038c24fc2';
const URL = "https://pixabay.com/api/";



// const option = { 

//     key: API_KEY,
//     q: 'namePhoto',
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: true,
//     page: "page",
//     per_page: 40,
// }

export async function fetchImages(namePhoto, page, pageLimit){
 const response = await axios.get(`${URL}?key=${API_KEY}&q=${namePhoto}&page=${page}&per_page=${pageLimit}&image_type=photo&orientation=horizontal&safesearch=true`);
 
return response.data; 

page +=1;
// .then(response => {
//     page +=1;
//     return response.data; 
//   });
}


// fetchImages ("dog", 1);

// const URL = "https://pixabay.com/api/";
// const KEY =  '39644186-d60e3e2f5d0cd6a0038c24fc2';


// export async function fetchPhoto(q, page, perPage) {
//     const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
//     const response = await axios.get(url);
//     return response.data;          
// };

// fetchPhoto('dog', 1, 40);

// export function fetchImages(){
// return fetch(`${URL}?key=${API_KEY}&q=${namePhoto}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`)
//      .then(response => {

//     if (!response.ok) {
//         throw new Error(response.status);
//     }
//     console.log(response.data);
//     return response.json();
//   });
// }


// var API_KEY = '39644186-d60e3e2f5d0cd6a0038c24fc2';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');


// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });