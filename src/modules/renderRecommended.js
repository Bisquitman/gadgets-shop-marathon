import {API_URI} from './var';

// Слайдер
// import Swiper JS
import Swiper, {Pagination} from 'swiper';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {cartControl} from "./cartControl";

export const renderRecommended = (recommended, data, id) => {
  const goods = data.goods.filter(item => item.id !== id);

  if (goods.length) {
    const container = document.createElement('div');
    container.className = "container";
    recommended.append(container);

    const sectionTitle = document.createElement('h2');
    sectionTitle.className = "recommended__title";
    sectionTitle.textContent = "Возможно вам также понравится";

    const recommendedSlider = document.createElement('div');
    recommendedSlider.className = "swiper recommended__carousel";

    const swiperWrapper = document.createElement('ul');
    swiperWrapper.className = "swiper-wrapper";

    const swiperPagination = document.createElement('div');
    swiperPagination.className = "swiper-pagination";

    recommendedSlider.append(swiperWrapper, swiperPagination);
    container.append(sectionTitle, recommendedSlider);

    const goodsCards = goods.map(item => {
      // console.log('item:', item);
      const swiperSlide = document.createElement('li');
      swiperSlide.className = "swiper-slide recommended__item";

      const itemCard = document.createElement('article');
      itemCard.className = "goods-card";
      itemCard.title = item.title;

      const itemLink = document.createElement('a');
      itemLink.className = "goods-card__link";
      itemLink.href = `card.html?id=${item.id}`;

      const itemImage = document.createElement('img');
      itemImage.className = "goods-card__image";
      itemImage.width = "340";
      itemImage.height = "340";
      itemImage.src = `${API_URI}/${item.images.present}`;
      itemImage.alt = item.title;

      const itemTitle = document.createElement('h3');
      itemTitle.className = "goods-card__title";
      itemTitle.textContent = item.title;

      const itemBuy = document.createElement('div');
      itemBuy.className = "goods-card__buy";

      const itemPrice = document.createElement('p');
      itemPrice.className = "goods-card__price";
      itemPrice.textContent = new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: 'RUB', maximumFractionDigits: 0,
      }).format(item.price);

      const itemToCart = document.createElement('button');
      itemToCart.className = "goods-card__to-cart";
      itemToCart.textContent = "В корзину";
      itemToCart.dataset.idGoods = item.id;

      itemLink.append(itemImage, itemTitle);
      itemBuy.append(itemPrice, itemToCart);
      itemCard.append(itemLink, itemBuy);
      swiperSlide.append(itemCard);

      return swiperSlide;
    });

    swiperWrapper.append(...goodsCards);

    // Слайдер рекомендаций
    new Swiper(recommendedSlider, {
      spaceBetween: 10,
      slidesPerView: 2,
      // autoHeight: true,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
      modules: [Pagination],
      breakpoints: {
        521: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
        620: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1600: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
        1920: {
          slidesPerView: 5,
        },
      }
    });

    cartControl({
      wrapper: swiperWrapper,
      classAdd: 'goods-card__to-cart',
      classDelete: 'goods-card__to-cart_remove',
    });
  } else {
    recommended.remove();
  }
};

