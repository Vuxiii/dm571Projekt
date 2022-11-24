var addItemToBasket = require('../routes/index.js').addItemToBasket;
var BasketItem = require('../routes/index.js').BasketItem;
var basket = require('../routes/index.js').basket;
var users = require('../routes/index.js').users;
var products = require('../routes/index.js').products;

test('Adding the product with id 0, should insert a BasketItem containing productID 0 and quantity 1 into the basket map.', () => {

    addItemToBasket( users[0], products[0][0] ); // user 0, product 0
    expect(basket[0][0]).toEqual( new BasketItem( 0, 1 ) );
})
