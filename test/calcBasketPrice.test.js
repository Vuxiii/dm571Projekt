var calcBasketPrice = require('../routes/index.js').calcBasketPrice;
var addItemToBasket = require('../routes/index.js').addItemToBasket;
var BasketItem = require('../routes/index.js').BasketItem;
var basket = require('../routes/index.js').basket;
var users = require('../routes/index.js').users;
var products = require('../routes/index.js').products;

test('the total price of the basket when adding two product of id 0 should be 466', () => {

    addItemToBasket( users[0], products[0][0] ); // user 0, product 0
    addItemToBasket( users[0], products[0][0] ); // user 0, product 0

    expect( calcBasketPrice(0) ).toBe( 466 )
    
})


test('the total price of an empty basket should be 0', () => {

    expect( calcBasketPrice(1) ).toBe( 0 )
    
})