import {API_URI} from "./var";
import Swiper, {Scrollbar, Thumbs} from "swiper";

const createCardImageSlider = (largeImages) => {
  const ul = document.createElement('ul');
  ul.className = 'swiper-wrapper';

  const cardImageSlides = largeImages.map(url => {
    const li = document.createElement('li');
    li.className = 'swiper-slide';
    const img = new Image();
    img.src = `${API_URI}/${url}`;
    li.append(img);
    return li;
  });

  ul.append(...cardImageSlides);
  return ul;
};

const createCardImageThumbSlider = (smallImages) => {
  const ul = document.createElement('ul');
  ul.className = 'swiper-wrapper';

  const cardImageSlides = smallImages.map(url => {
    const li = document.createElement('li');
    li.className = 'swiper-slide';
    const button = document.createElement('button');
    button.className = 'card__thumb-btn';
    const img = new Image();
    img.src = `${API_URI}/${url}`;
    button.append(img);
    li.append(button);
    return li;
  });

  ul.append(...cardImageSlides);
  return ul;
};

const createParams = (params) => {
  const list = [];

  for (const paramsKey in params) {
    const li = document.createElement('li');
    li.className = 'card__params-item';
    li.innerHTML = `
      <span>${paramsKey}: </span>
      <span>${params[paramsKey]}</span>
    `;
    list.push(li);
  }
  return list;
};

const createDescription = (descriptions) => {
  const list = [];

  for (const description of descriptions) {
    const p = document.createElement('p');
    p.innerHTML = description;
    list.push(p);
  }
  return list;
};

export const renderItem = (item) => {
  // console.log('item:', item);
  const cardImage = document.querySelector('.card__image');
  cardImage.append(createCardImageSlider(item.images.large));

  const cardSliderThumb = document.querySelector('.card__slider-thumb')

  const swiperScrollbar = document.createElement('div');
  swiperScrollbar.className = 'swiper-scrollbar';

  cardSliderThumb.append(createCardImageThumbSlider(item.images.small), swiperScrollbar);

  const cardTitle = document.querySelector('.card__title');
  cardTitle.textContent = item.title;

  const cardVendorCode = document.querySelector('.card__vendor-code');
  cardVendorCode.textContent = `Артикул: ${item.id}`;

  const cardPrice = document.querySelector('.card__price');
  cardPrice.textContent = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(item.price);

  const cardAddCart = document.querySelector('.card__add-cart');
  cardAddCart.dataset.idGoods = item.id;

  const cardParamsList = document.querySelector('.card__params-list');
  cardParamsList.append(...createParams(item.characteristic));

  const cardDescriptionText = document.querySelector('.card__description-text');
  cardDescriptionText.append(...createDescription(item.description));

  // init Swipers:
  const thumbSwiper = new Swiper(cardSliderThumb, {
    spaceBetween: 44,
    slidesPerView: 3,
    scrollbar: {
      el: swiperScrollbar,
      draggable: true,
    },
    modules: [Scrollbar],
  });

  new Swiper(cardImage, {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
      swiper: thumbSwiper,
      slideThumbActiveClass: 'card__thumb-btn_active',
    },
    modules: [Thumbs],
  });
};
