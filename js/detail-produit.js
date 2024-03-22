// Animation en caroussel des photos à l'aide de la librairie swipper
const swiper = new Swiper('.swipper-detail', {
    // parametres du caroussel
    // direction
    direction: 'horizontal',
    loop: true,
    // flèche de navigation
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})