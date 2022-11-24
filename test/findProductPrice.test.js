var findProductPrice = require('../routes/index.js').findProductPrice;

test('the price for product with id 0 should be 233', () => {
    expect(findProductPrice(0)).toBe(233);
})

test('the price for product with id 2 should be 200', () => {
    expect(findProductPrice(2)).toBe(200);
})

test('the price for product with id -1 should be -1', () => {
    expect(findProductPrice(-1)).toBe(-1);
})