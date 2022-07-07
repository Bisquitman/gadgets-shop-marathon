import {API_URI} from "./var";

export const renderGoods = (wrapper, goods) => {
  wrapper.textContent = '';

  const cards = goods.map(item => {
    console.log('item:', item);

    const li = document.createElement('li');
    li.className = 'goods__item';
    li.innerHTML = `
      <article class="goods-card">
        <a href="./card.html?ida=${item.id}">
          <img src="${API_URI}/${item.images.present}" alt="${item.title}" class="goods-card__image" width="340" height="340">
          <h3 class="goods-card__title">${item.title}</h3>
        </a>

        <div class="goods-card__buy">
          <p class="goods-card__price">${item.price}&nbsp;₽</p>
          <button class="goods-card__to-cart" data-id-goods="${item.id}">В корзину</button>
        </div>
      </article>
    `;
    return li;
  });
  wrapper.append(...cards);
};
