require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Tests is fetchItem is a function', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  it('Run fetchItem function with item argument "MLB1615760527" and test if fetch was called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Test if, when calling the fetchItem function with the item argument "MLB1615760527", the fetch function uses the endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Test if the fetchItem function return with the item argument "MLB1615760527" is a data structure equal to the item object that is already imported in the file.', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Test if calling the fetchItem function with no argument returns an error with the message: "You must provide an url"', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };
  });
});
