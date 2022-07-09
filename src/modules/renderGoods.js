import {API_URI} from "./var";

export const renderGoods = (wrapper, goods) => {
  wrapper.textContent = '';

  if (!goods.length) {
    wrapper.innerHTML = `
      <h2 style="grid-column: 1/-1; text-align: center;">По вашему запросу товаров не найдено.</h2>
    `;
  }

  const cards = goods.map(item => {
    const li = document.createElement('li');
    li.className = 'goods__item';
    li.innerHTML = `
      <article class="goods-card">
        <a href="./card.html?id=${item.id}">
          <img src="${API_URI}/${item.images.present}" alt="${item.title}" class="goods-card__image" width="340" height="340">
          <h3 class="goods-card__title">${item.title}</h3>
        </a>

        <div class="goods-card__buy">
          <p class="goods-card__price">${new Intl.NumberFormat('ru-Ru', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(item.price)}</p>
          <button class="goods-card__to-cart" data-id-goods="${item.id}">В корзину</button>
        </div>
      </article>
    `;
    return li;
  });
  wrapper.append(...cards);
};
