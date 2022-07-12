const fetchItem = (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
