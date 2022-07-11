require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Tests is fetchProducts is a function', () => {
    expect(typeof fetchProducts).toEqual('function')
  });
  it('Tests if fetch is called in a fetchProducts functions with an argument "computador" ', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Tests if fetchProducts is called with the "computador" argument, fetch uses the endpoint correctly', () => {
    fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('tests if the fetchProducts function return with the "computador" argument, is a data structure equal to the computerSearch object', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Tests if, when calling the fetchProducts function without an argument, it returns an error with the message: "You must provide an url"', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }; 
  });
});
