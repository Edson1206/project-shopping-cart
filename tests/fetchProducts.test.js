require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Test if fetchProducts is a function', () => {
    expect(typeof fetchProducts).toEqual('function')
  });
  it('Run fetchProducts function with "computer" argument and test if fetch was called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Test if, when calling the fetchProducts function with the "computer" argument, the fetch function uses the "https://api.mercadolibre.com/sites/MLB/search?q=computador" endpoint', () => {
    fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Test if the fetchProducts function return with the "computer" argument is a data structure equal to the computerSearch object, which is already imported in the file', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Test if calling the fetchProducts function with no argument returns an error with the message: "You must provide an url"', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }; 
  });
});
