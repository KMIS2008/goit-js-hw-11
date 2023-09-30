import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

export let lightboxImages = new SimpleLightbox('.gallery a',
 {
    captionsData: 'alt',
	captionDelay: 250,
    
})