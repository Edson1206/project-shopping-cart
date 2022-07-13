const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const argument = '<ol><li>Item</li></ol>';

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  beforeEach(() => saveCartItems(argument));
  it('Test if, when executing saveCartItems with the <ol><li>Item</li></ol> argument, the localStorage.setItem method is called', () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Test if, when executing saveCartItems with the <ol><li>Item</li></ol> argument, the localStorage.setItem method is called with two parameters, the first being "cartItems" and the second being the value passed as argument to saveCartItems', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argument);
  })
});
