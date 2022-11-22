var express = require('express');
// axios.defaults.baseURL = 'localhost:/3000';
var router = express.Router();
var nextPanID = 0;
var nextOrderID = 0;
var userID = 0;

class Order {
  constructor(basketItems, shipDate, status, complete ) {
    // this.id = id; // int
    this.id = nextOrderID++;
    // this.productId = productId; // list<int>
    // this.quantity = quantity; // list<int>
    this.products = basketItems; // list<BasketItem>
    this.shipDate = shipDate; // string
    this.status = status; // enum placed, approved, delivered
    this.complete = complete; // bool
  }
};

class BasketItem {
  constructor( productID, quantity ) {
    this.productID = productID;
    this.quantity = quantity;
  }
}

class Customer {
  constructor( id, username, address ) {
    this.id = id; // int
    this.username = username; // string
    this.address = address; // list<Address>
  }
  
};
class Address {
  constructor( street, city, state, zip ) {
    this.street = street; // string
    this.city = city;// string
    this.state = state;// string
    this.zip = zip;// string
  }
  
};

class Category {
  constructor( id, name ) {
    this.id = id; // int
    this.name = name; // string
  }
};

class User {
  constructor( username, firstName, lastName, email, password, phone, userStatus ) {
    this.id = userID++; // int
    this.username = username; // string
    this.firstName = firstName; // string
    this.lastName = lastName; // string
    this.email = email; // string
    this.password = password; // string
    this.phone = phone; // string
    this.userStatus = userStatus; // ???? enum: admin / customer
  }
};

class Tag {
  constructor( id, name ) {
    this.id = id; // int
    this.name = name; // string

  }
};

class Product {
  constructor( name, price, category, photoUrls, tags, status, inventory ) {
    this.id = nextPanID++; // int
    this.price = price; // float
    this.name = name; // String
    this.category = category; // Category
    this.photoUrls = photoUrls; // list<string>
    this.tags = tags; // List<Tag>
    this.status = status; // enum In store, More on the way, Sold out
    this.inventory = inventory; // integer
  }
};

var users = [ 
	new User( "willi", "William", "Juhl", "asdf@student.dk", "1234", "246234", "Customer" ),
	new User( "marco", "Marcell", "KLitten", "marcer@student.dk", "5345", "245234", "Admin" ),
];

var categoryPande = new Category( 0, "Pander" );
var tag1 = new Tag( 0, "Rustfrit Stål" );


var products = [ 
  [ 
	  new Product( ("Pande" + nextPanID), 1, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pande" + nextPanID), 2, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 3, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 4, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
  ],
  [ 
	  new Product( ("Pande" + nextPanID), 5, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pande" + nextPanID), 6, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 7, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 8, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
  ],
  [ 
	  new Product( ("Pande" + nextPanID), 9, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pande" + nextPanID), 10, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 11, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 12, categoryPande, ["/images/fried-rice.jpg"], tag1, "in store", 4 ),
  ]
];

var productsPot = [ 
  [ 
	  new Product( ("Pots" + nextPanID), 1, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pots" + nextPanID), 2, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pots" + nextPanID), 3, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pots" + nextPanID), 4, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
  ],
  [ 
	  new Product( ("Pots" + nextPanID), 5, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pots" + nextPanID), 6, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pots" + nextPanID), 7, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pots" + nextPanID), 8, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
  ],
  [ 
	  new Product( ("Pots" + nextPanID), 9, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pots" + nextPanID), 10, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pots" + nextPanID), 11, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
	  new Product( ("Pots" + nextPanID), 12, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 4 ),
  ]
];


var orders = {
}; // <User.id,List<Order>>

console.log( users )
console.log( users[0].id )

for ( let i = 0; i < users.length; ++i ) {
  orders[users[i].id] = [ new Order( [ new BasketItem( 3, 4 ), new BasketItem( 1, 2 ) ], "NOW", "in shipping", false ) ];  
}
// basketItems, shipDate, status, complete
var basket = {} // <User.id,List<BasketItem>>

basket[users[0].id] = [];
basket[users[1].id] = [];

// TODO: We need to check every place we refere to basket. IT IS NOW A MAP
var buttonFuncs = {

  addToBasket: function( userID, pID ) {
    fetch('/api/basket', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: userID, productID: pID })
    })
  },

  clickBtn: function() {  // https://reqbin.com/code/javascript/wzp2hxwh/javascript-post-request-example
    console.log( 'Hej' ) 
    fetch('/api/product', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 'lmfao' })
    } );
  },

  findByStatus: function( _status ) {
  //   fetch('/product/' + _status, {
  //     method: 'GET',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     }
  // } );
    
    var url = new URL( '/product/' + _status, 'http://localhost:3000/' );
    // url.searchParams.set( 'status', _status );
    
    return url;
    /* 
    console.log( url );
    fetch( url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
      // body: JSON.stringify({ status: _status })
  } ).then( async function(response) {
    // if ( !response.ok ) return;
    // let json = await response.json();
    // console.log( json.result );
    // console.log( 'Found: ' + JSON.parse( json ) );
  }, function(reason) {
    // console.log( reason )
  });
  */
  },

  buyOrder: function( _userID ) {
    // Make post to basket or order?
    fetch(`/basket/buy`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( { userID: _userID } )
    })
  },

  increaseBasketItemQuantity: function( userID, productID, i ) {
    fetch(`/api/basket/increaseQuantity`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( { user: userID, id: productID, i: i } )
    })
    // var url = new URL( '/basket/' + user + '/' + id + '/' + i, 'http://localhost:3000/' );
    
    // return url;
  }

};

/* GETTERS */ 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req, res) => {
  res.render("user", { users: users } );
  
})

router.get('/product', (req, res) => {
  res.render("product", { 
    bbasket: basket.length, 
    products: products, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})

router.get('/marcellsTest', (req, res) => {
  res.render("marcellsTest", { 
    products: products, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})

router.get('/pots', (req, res) => {
  res.render("pots", { 
    products: productsPot, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})

router.get('/pans', (req, res) => {
  res.render("pans", { 
    bbasket: basket.length, 
    user: users[0],
    products: products, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})


router.get('/userprofile', (req, res) => {
  res.render("userprofile", { users: users } );
  
})


router.get('/orders', (req, res) => {
  console.log( orders );
  res.render("orders", { 
    users: users,
    orderss: orders,
    // bbasket: basket.length, 
    // user: users[0],
    // products: products, 
    // filteredProducts: [],
    // addToBasket: buttonFuncs.addToBasket, 
    // clickBtn: buttonFuncs.clickBtn, 
    // findByStatus: buttonFuncs.findByStatus
  } );
})



// Marcell Slut:


router.get( '/product/:findByStatus', (req, res) => {
  console.log("I WAS CALLED")
  let li = findByStatus( { status: req.params.findByStatus } );
  if ( li === undefined ) li = [];
  console.log(li)
  res.render("product", { 
    products: products, 
    filteredProducts: li,
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );

} );

router.get( '/api/product/:findByStatus', (req, res) => {
  
  let li = findByStatus( { status: req.params.findByStatus } );

  if ( li )
    res.status(200).send( JSON.stringify( { result: li } ) );
  
  res.status(400).send( "Invalid status search, valid are 'in store', 'more on the way' or 'sold out'." );

} );

function findByStatus( query ) {
  let pred;
  if ( query.status === "in store" ) {
    pred = (product) => product.status === "in store";
  } else if ( query.status === "more on the way" ) {
    pred = (product) => product.status === "more on the way";
  } else if ( query.status === "sold out" ) {
    pred = (product) => product.status === "sold out";
  } else {
    return undefined
    // res.status(400).send( "Invalid status search, valid are 'in store', 'more on the way' or 'sold out'." );
  }

  var li = products.filter( pred, products );

  console.log( li );

  return li;
}
router.get('/userprofile', (req, res) => {
  res.render("userprofile", { users: users } );
  
})


// Add a new product to the store.
router.post('/api/product', (req, res) => {
  
  console.log( req.body );
  product = new Product( 
    req.body.productName, 
    req.body.productPrice, 
    req.body.productCategory, 
    req.body.photoUrls, 
    req.body.tags, 
    req.body.productInStore > 0 ? 'In Store' : "Not in store", 
    req.body.productInventory
  );

  products.push( product );
  // products.push( new Product( ("Pande" + nextPanID), 42.5, categoryPande, [], tag1, "In Store", 4 ) );
  console.log( products );
  
  // Maybe add success
  // Marcell: adde productsPot to products? 
  res.render("product", { products: products, addToBasket: buttonFuncs.addToBasket, clickBtn: buttonFuncs.clickBtn } );

})

router.post('/api/basket', (req, res) => {
  console.log( req.body );
  let id = req.body.productID;
  // product = ;

  // product.inventory--;
  var p; 
  //for(list in products){
  for ( i = 0; i < products.length; i++){
    list=products[i];
    // console.log( list )
    for ( let j = 0; j < list.length; j++ ) {
      console.log( id, "==", list[j].id, " -> ", id == list[j].id )
      if ( list[j].id == id ) {
        p = list[j];
        console.log( "*******************", users );
        addItemToBasket( users[req.body.userID], p )
        return;
      }
        
    }
  }
    console.log( "FAILURE IN API BASKET" );
  
  // products.push( new Product( ("Pande" + nextPanID), 42.5, categoryPande, [], tag1, "In Store", 4 ) );
  // console.log( products );
})

function constructBasket( user ) {
  var li = [];
  console.log( "user: " + user.id );
  console.log( "Basket: " + basket[user.id] );
  for ( i = 0; i < basket[user.id].length; i++ ) {
    for( n = 0; n < products.length; n++){
      list=products[n];
      const p = list.find( (product) => product.id == basket[user.id][i].productID )
      if(p != undefined)
        li.push( { 
          name: p.name,
          productID: p.productID,
          // name: products[2].find( (product) => product.id == basket[user.id][i].productID ).name,
          quantity: basket[user.id][i].quantity,
          basketImage: p.photoUrls
        });
        console.log( p )
    }
  };
  return li;
}

function addItemToBasket( user, product ) {
  var found = false;
  var i;
  console.log( "IDDDDD: ", user.id )
  console.log( "IDDDDD: ", basket[user.id] )
  for ( i = 0; i < basket[user.id].length; i++ ) {
    if ( basket[user.id][i].productID == product.id ) {
      found = true;
      break;
    }
  }
  console.log( "I " + (found ? "found" : "did not find") + " the product in the basket.")
  console.log( "i is -> " + i );
  if ( found ) {
    // console.log( basket[user.id][i].quantity )
    basket[user.id][i].quantity += 1;
    // console.log( basket[user.id].quantity[i] )
  } else {
    console.log("hej " + product)
    console.log( basket[user.id] )
    basket[user.id].push( new BasketItem( product.id, 1 ) );
    console.log("asdfasdfasdf")
  }
  
}

router.get( '/basket', (req, res) => {
  console.log( "At basket :0" )
  var li = constructBasket( users[0] ); // Product name, quantity

  console.log( users[0].id )
  res.render( 'basket', { 
    increaseQuant: buttonFuncs.increaseBasketItemQuantity,
    buyOrder: buttonFuncs.buyOrder,
    user: users[0],
    order: li
  } );
} )

router.post( '/api/basket/increaseQuantity', (req, res) => {
  let i = req.body.i;
  let user = req.body.user;
  let id = req.body.id;
  console.log( user );
  console.log( basket );
  console.log( req.body );
  for ( let index = 0; index < basket[user].length; ++index ) {
    console.log("YAYAYAYYAAYYA");
    console.log(basket[user][index])
    if (basket[user][index].productID === id ) {
      basket[user][index].quantity += i;
      res.status(200).send( "success" );
    }
  }
  res.status(400).send( "Something went bad..." );
} );

router.post( '/api/basket/buy', (req, res) => {
  const userID = req.body.userID;
  
  if ( basket[userID].length > 0 ) {
    orders[userID].push( basket[userID] );
    basket[userID] = [];

    res.status(200).send( "success" );
  } else {
    res.status(400).send( "Empty Basket" );
  }

  

  
} );

// Nikolaj arbejder her //
// Store calls
function getStoreInventory(){
  return basket;
}

var storeOrders = [] // list of orders
function postStoreOrder(){
  for( i = 0; i < storeOrders.length; i++)
  storeOrders[i] = Order(basket, new Date, placed, false)
}

function getStoreOrder(id){
  var found = false;
  var i;
  for ( i = 0; i < storeOrders.length; i++){
    if( id == storeOrders[i].id){
      found = true;
      break;
    }
  }
  if (found){
    //push storeOrders[i];
  }
}

function deleteStoreOrder(id){
  var found = false;
  var i;
  for ( i = 0; i < storeOrders.length; i++){
    if( id == storeOrders[i].id){
      found = true;
      break;
    }
  }
  if(found){
    storeOrders.splice[i,1];
  }
}

// User calls
router.post('/user', (req, res) => {
  
  console.log( req.body );
  req.body.username
  req.body.firstName
  req.body.lastName
  req.body.email
  req.body.password
  req.body.phone
  req.body.userStatus 
  users.push( new User(username, firstname, lastname, email, password, phone, userStatus) );
  
  console.log( user );
  res.end()
})
function postCreatedUser(){
  // push users[users.length-1]
}
function postAllUsers(){
  // push users
}

var loginUser = []
router.post('/***', (req,res) => {

  console.log(req.body);
  req.body.username
  req.body.password
  loginUser.push(username)
  loginUser.push(password)
})

function userLogin(){
  var found = false;
  for(i = 0; i < users.length; i++){7
    if( users[i].username == loginUser[0] && users[i].password == loginUser[1]){
      found = true;
      break;
    }
  }
  loginUser.length = 0;
  if(found){
    // login user
  }
  
}
function userLogout(){
  // logout user
}
function getUser(username){
  var found = false;
  var i;
  for(i = 0; i < users.length; i++){
    if(users[i].username == username){
      found = true;
      break;
    }
  }
  if(found){
    //push users[i]
  }
}
function updateUserProfile(username){
  var found = false;
  var i;
  for(i = 0; i < users.length; i++){
    if(users[i].username == username){
      found = true;
      break;
    }
  }
  if(found){
    // change user
  }
}
function deleteUser(username){
  var found = false;
  var i;
  for(i = 0; i < users.length; i++){
    if(users[i].username == username){
      found = true;
      break;
    }
  }
  if(found){
    users.splice(i,1)
  }
}

module.exports = router;