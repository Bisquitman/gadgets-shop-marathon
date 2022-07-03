import './index.html'; // Для сервера - следить за этим файлом и обновлять страницу при его изменении
import './card.html';
import './cart.html';
import './index.scss';

import {pagination} from "./modules/pagination";

const paginationWrapper = document.querySelector('.pagination');
const pageUrl = new URL(location);
const page = +pageUrl.searchParams.get('page') || 1;

try {
  pagination(paginationWrapper, 20, page, 6);
} catch (err) {
  console.warn(err)
  console.warn('Это не главная страница. Тут нет пагинации.')
}

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
