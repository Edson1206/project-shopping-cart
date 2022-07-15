const elementProduct = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');

const sumPrices = () => {
  let amount = 0;
  const getItem = document.querySelectorAll('.cart__item'); 
  getItem.forEach((item) => {
    amount += Number(item.innerText.split('$')[1]);
  });
  total.innerHTML = amount;
  if (total.innerHTML === '0') total.innerHTML = '';
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  sumPrices();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const loadProdutsCart = async (event) => {
  const ProductID = getSkuFromProductItem(event.target.parentNode);
  const fetchEveryItem = await fetchItem(ProductID);
  const cart = createCartItemElement(fetchEveryItem);
  elementProduct.appendChild(cart);
  saveCartItems(elementProduct.innerHTML);
  sumPrices();
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', loadProdutsCart);
  return section;
};

const loadProductList = async () => {
  const data = await fetchProducts('computador');
  const { results } = data;
  const sectionProducts = document.querySelector('.items');
  results.forEach((result) => { 
    const sku = result.id;
    const name = result.title;
    const image = result.thumbnail;
    sectionProducts.appendChild(createProductItemElement({ sku, name, image })); 
  });
};

const clean = document.querySelector('.empty-cart');
clean.addEventListener('click', () => {
  elementProduct.innerHTML = '';
  saveCartItems(elementProduct.innerHTML);
  sumPrices();
});

const loading = () => {
  const element = document.createElement('h1');
  element.innerText = 'carregando...';
  element.className = 'loading';
  const body = document.querySelector('body');
  body.appendChild(element);
};

const removeLoading = () => {
  const tagLoading = document.querySelector('.loading');
  tagLoading.remove();
};

const cartClickEvent = () => {
  elementProduct.innerHTML = getSavedCartItems();
  const ol = document.querySelectorAll('.cart__item');
  ol.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

window.onload = async () => { 
  loading();
  await loadProductList();
  cartClickEvent();
  removeLoading();
  sumPrices();
};
