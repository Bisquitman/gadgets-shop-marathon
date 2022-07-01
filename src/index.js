import './index.html'; // Для сервера - следить за этим файлом и обновлять страницу при его изменении
import './card.html';
import './cart.html';
import './index.scss';

// import Swiper JS
import Swiper, { Thumbs, Scrollbar, Pagination } from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

// init Swipers:
const thumbSwiper = new Swiper('.card__slider-thumb', {
  spaceBetween: 44,
  slidesPerView: 3,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Scrollbar],
});
new Swiper('.card__image', {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: 'card__thumb-btn_active',
  },
  modules: [Thumbs],
});
new Swiper('.recommended__carousel', {
  spaceBetween: 30,
  slidesPerView: 5,
  pagination: {
    el: ".swiper-pagination",
  },
  modules: [Pagination],
});
