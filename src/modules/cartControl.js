import {API_URI} from "./var";
import {serviceCounter} from "./counterControl";

const addToCart = (id, count = 1) => {
  const cartGoods = localStorage.getItem('cart-ts') ?
    JSON.parse(localStorage.getItem('cart-ts')) :
    {};

  cartGoods[id] = count;
  localStorage.setItem('cart-ts', JSON.stringify(cartGoods));
};

const removeFromCart = (id) => {
  const cartGoods = localStorage.getItem('cart-ts') ?
    JSON.parse(localStorage.getItem('cart-ts')) :
    {};

  delete cartGoods[id];
  localStorage.setItem('cart-ts', JSON.stringify(cartGoods));
};

const checkItems = ({classDelete, classAdd, classCount} = {}) => {
  const cartGoods = localStorage.getItem('cart-ts') ?
    JSON.parse(localStorage.getItem('cart-ts')) :
    {};

  let count = 0;

  for (const cartGoodsKey in cartGoods) {
    count += cartGoods[cartGoodsKey];
  }

  const cartElem = document.querySelector('.header__cart');
  cartElem.dataset.count = count;

  if (classDelete) {
    const elems = document.querySelectorAll('[data-id-goods]');
    elems.forEach(elem => {
      if (cartGoods[elem.dataset.idGoods]) {
        elem.classList.add(classDelete);
        elem.textContent = 'В корзине';
      } else {
        elem.classList.remove(classDelete);
        elem.textContent = 'В корзину';
      }
    });
  }

  if (classAdd && classCount) {
    const countElem = document.querySelector(`.${classCount}`);
    const addElem = document.querySelector(`.${classAdd}`);
    countElem.value = cartGoods[addElem.dataset.idGoods] || 1;
  }
};

export const cartControl = ({wrapper, classAdd, classDelete, classCount} = {}) => {
  checkItems({classDelete, classAdd, classCount});

  if (wrapper && classAdd && classDelete) {
    wrapper.addEventListener('click', ({target}) => {
      const id = target.dataset.idGoods;

      if (!id) return;

      if (target.closest(`.${classDelete}`)) {
        removeFromCart(id);
      } else if (target.closest(`.${classAdd}`)) {
        addToCart(id);
      }
      checkItems({classDelete});
    })
  } else if (classAdd && classCount) {
    const btn = document.querySelector(`.${classAdd}`);
    const id = btn.dataset.idGoods;

    const countElem = document.querySelector(`.${classCount}`);

    btn.addEventListener('click', () => {
      const count = +countElem.value;

      addToCart(id, count);

      checkItems();
    });
  }
};

export const renderCart = (goods, cartGoods) => {
  const cartGoodsList = document.querySelector('.cart-goods__list');
  cartGoodsList.textContent = '';
  const priceOutput = document.querySelectorAll('.total__row_grey > span');
  const totalPriceOutput = document.querySelectorAll('.total__row_header > span');
  let totalPrice = 0;

  goods.forEach(item => {
    const li = document.createElement('li');
    li.className = "cart-goods__item item";
    li.title = `${item.title}`;

    const img = new Image(200, 200);
    img.className = "item__img";
    img.src = `${API_URI}/${item.images.present}`;
    img.alt = item.title;

    const detail = document.createElement('div');
    detail.className = "item__detail";

    const title = document.createElement('h4');
    title.className = "item__title";
    title.textContent = item.title;

    const vendor = document.createElement('p');
    vendor.className = "item__vendor-code";
    vendor.textContent = `Артикул: ${item.id}`;

    const control = document.createElement('div');
    control.className = "item__control";

    const count = document.createElement('div');
    count.className = "card__count item__count";
    count.dataset.idGoods = item.id;

    const dec = document.createElement('button');
    dec.className = "card__btn item__btn_dec";
    dec.textContent = '–';

    const quantity = document.createElement('output');
    quantity.className = "card__quantity item__quantity";
    quantity.value = cartGoods[item.id];

    const inc = document.createElement('button');
    inc.className = "card__btn item__btn_inc";
    inc.textContent = '+';

    const price = document.createElement('p');
    price.className = "item__price";
    price.textContent = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(item.price * cartGoods[item.id]);

    totalPrice += item.price * cartGoods[item.id];
    priceOutput[1].textContent = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(totalPrice);

    const removeBtn = document.createElement('button');
    removeBtn.className = "item__remove";
    removeBtn.innerHTML = `
      <svg>
        <use href="#remove"/>
      </svg>
    `;

    count.append(dec, quantity, inc);
    detail.append(title, vendor);
    control.append(count, price, removeBtn);
    li.append(img, detail, control);

    cartGoodsList.append(li);

    serviceCounter({
      wrapper: count,
      number: quantity,
      selectorDec: '.item__btn_dec',
      selectorInc: '.item__btn_inc',
    });

    count.addEventListener('click', ({target}) => {
      if (target.closest('.item__btn_dec, .item__btn_inc')) {
        addToCart(item.id, +quantity.value);
        checkItems();
        price.textContent = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          maximumFractionDigits: 0,
        }).format(item.price * quantity.value);
      }
    });

    removeBtn.addEventListener('click', () => {
      removeFromCart(item.id);
      li.remove();
      checkItems();
    });
  });
};
