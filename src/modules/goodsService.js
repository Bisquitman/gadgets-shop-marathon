import {API_URI} from "./var";

export const getGoods = () => {
  const pageUrl = new URL(location);

  const url = new URL(`${API_URI}/api/goods`);

  for (const item of pageUrl.searchParams.entries()) {
    url.searchParams.set(item[0], item[1]);
  }

  return fetch(url).then(response => response.json());
};

export const getGoodsItem = (id) =>
  fetch(`${API_URI}/api/goods/${id}`)
    .then(response => response.json());

export const getCategory = () =>
  fetch(`${API_URI}/api/category`)
    .then(response => response.json());

export const getGoodsList = (list) =>
  fetch(`${API_URI}/api/goods/?list=${list}`)
    .then(response => response.json());

export const getGoodsCategoryItem = (category) =>
  fetch(`${API_URI}/api/goods/?category=${category}`)
    .then(response => response.json());
