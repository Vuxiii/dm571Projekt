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
	  new Product( ("Pande" + nextPanID), 1, categoryPande, ["/public/images/fried-rice.jpg"], tag1, "in store", 10 ),
	  new Product( ("Pande" + nextPanID), 2, categoryPande, [], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 3, categoryPande, [], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 4, categoryPande, [], tag1, "in store", 4 ),
  ],
  [ 
	  new Product( ("Pande" + nextPanID), 5, categoryPande, [], tag1, "in store", 10 ),
	  new Product( ("Pande" + nextPanID), 6, categoryPande, [], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 7, categoryPande, [], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 8, categoryPande, [], tag1, "in store", 4 ),
  ],
  [ 
	  new Product( ("Pande" + nextPanID), 9, categoryPande, [], tag1, "in store", 10 ),
	  new Product( ("Pande" + nextPanID), 10, categoryPande, [], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 11, categoryPande, [], tag1, "in store", 4 ),
	  new Product( ("Pande" + nextPanID), 12, categoryPande, [], tag1, "in store", 4 ),
  ]
];
// var filteredProducts = [];

var orders = {
  
}; // <User,List<Order>>

console.log( users )
console.log( users[0].id )

for ( let i = 0; i < users.length; ++i ) {
  orders[i] = [];  
}

var basket = {} // <User,List<BasketItem>>

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

  buyOrder: function( _user ) {
    orders[_user].push( basket[_user] );
    b
  },

  increaseBasketItemQuantity: function( user, id, i ) {
    fetch(`/basket/increaseQuantity`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( { user: user, id: id, i: i } )
    })
    // var url = new URL( '/basket/' + user + '/' + id + '/' + i, 'http://localhost:3000/' );
    
    // return url;
  }

};  


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req, res) => {
  res.render("user", { users: users } );
  
})

router.get('/product', (req, res) => {
  res.render("product", { 
    products: products, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})

// Marcell START
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
    products: products, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})

router.get('/pans', (req, res) => {
  res.render("pans", { 
    products: products, 
    filteredProducts: [],
    addToBasket: buttonFuncs.addToBasket, 
    clickBtn: buttonFuncs.clickBtn, 
    findByStatus: buttonFuncs.findByStatus
  } );
})

// Marcell END

// Marcell END

router.get('/pots', (req, res) => {
  res.render("pots", { users: users } );
  
})
router.get('/userprofile', (req, res) => {
  res.render("userprofile", { users: users } );
  
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
router.get('/pans', (req, res) => {
  res.render("pans", { users: users } );
  
})

router.get('/pots', (req, res) => {
  res.render("pots", { users: users } );
  
})
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
  res.render("product", { products: products, addToBasket: buttonFuncs.addToBasket, clickBtn: buttonFuncs.clickBtn } );

})

router.post('/api/basket', (req, res) => {
  console.log( req.body.id );
  // product = ;

  // product.inventory--;
  var p; 
  //for(list in products){
  for ( i = 0; i < products.length; i++){
    list=products[i];
    p = list.find( (product) => product.id === req.body.id );
    console.log( p )
    if(p)
      break;
  }
  addItemToBasket( p )
  
  // products.push( new Product( ("Pande" + nextPanID), 42.5, categoryPande, [], tag1, "In Store", 4 ) );
  // console.log( products );
})

function constructBasket() {
  var li = [];
  for ( i = 0; i < basket.length; i++ ) {
    li.push( { 
      name: products.find( (product) => product.id == basket[i].productID ).name,
      quantity: basket[i].quantity
    } );
    
  }
  return li;
}

function addItemToBasket( user, product ) {
  var found = false;
  var i;
  console.log( basket[user].length )
  for ( i = 0; i < basket[user].length; i++ ) {
    if ( basket[user][i].productID == product.id ) {
      found = true;
      break;
    }
  }
  console.log( "I " + (found ? "found" : "did not find") + " the product in the basket.")
  console.log( "i is -> " + i );
  if ( found ) {
    // console.log( basket[i].quantity )
    basket[user][i].quantity += 1;
    // console.log( basket.quantity[i] )
  } else {
    basket[user].push( new BasketItem( product.id, 1 ) );
  }
  
}

router.get( '/basket', (req, res) => {
  console.log( "At basket :0" )
  var li = constructBasket(); // Product name, quantity

  console.log( li )
  res.render( 'basket', { user: users[0], order: li } );
} )

router.post( '/basket/increaseQuantity', (req, res) => {
  let i = req.body.i;
  let user = req.body.user;
  let id = req.body.id;
  for ( index = 0; index < basket[user].length; ++index ) {
    if (basket[user].productID === id ) {
      basket[user].quantity += i;
      res.status(200).send( "success" );
    }
  }
  res.status(400).send( "Something went bad..." );
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
// Til her


module.exports = router;