var express = require('express');
const axios = require('axios').default;
// axios.defaults.baseURL = 'localhost:/3000';
var router = express.Router();
var nextPanID = 0;
var nextOrderID = 0;

class Order {
  constructor(id, productId, quantity, shipDate, status, complete ) {
    // this.id = id; // int
    this.id = nextOrderID++;
    // this.productId = productId; // list<int>
    // this.quantity = quantity; // list<int>
    this.products = []; // list<BasketItem>
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
  constructor( id, username, firstName, lastName, email, password, phone, userStatus ) {
    this.id = id; // int
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
	new Product( ("Pande" + nextPanID), 69.0, categoryPande, [], tag1, "In Store", 10 ),
	new Product( ("Pande" + nextPanID), 420.69, categoryPande, [], tag1, "In Store", 4 ),
];

var basket = [] // List<{ productID: int, quantity: int }


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req, res) => {
  res.render("users", { users: users } );
  
})

router.get('/products', (req, res) => {
  res.render("products", { products: products, addToBasket: function( pID ) {
    fetch('/basket', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: pID })
  })
  }, clickBtn: function() {  //https://reqbin.com/code/javascript/wzp2hxwh/javascript-post-request-example
    console.log( 'Hej' )
    // axios.post( '/products', {} ); 
    fetch('/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 'lmfao' })
    })
    // .then(function(response) { response.json() }) // update her :-)
    // .then(function(response) { console.log(JSON.stringify(response)) })
  } } );
})

router.post('/products', (req, res) => {
  
  console.log( req.body );
  products.push( new Product( ("Pande" + nextPanID), 42.5, categoryPande, [], tag1, "In Store", 4 ) );
  console.log( products );
  res.end()
})

router.post('/basket', (req, res) => {
  console.log( req.body.id );
  // product = ;

  // product.inventory--;
  var p = products.find( (product) => product.id === req.body.id );
  console.log( p )
  addItemToBasket( p )

  // products.push( new Product( ("Pande" + nextPanID), 42.5, categoryPande, [], tag1, "In Store", 4 ) );
  // console.log( products );
})

function addItemToBasket( product ) {
  var found = false;
  var i;
  for ( i = 0; i < basket.length; i++ ) {
    if ( basket[i].productID == product.id ) {
      found = true;
      break;
    }
  }
  console.log( "I " + (found ? "found" : "did not find") + " the product in the basket.")
  console.log( "i is -> " + i );
  if ( found ) {
    // console.log( basket[i].quantity )
    basket[i].quantity += 1;
    // console.log( basket.quantity[i] )
  } else {
    basket.push( { productID: product.id, quantity: 1 } );
    // basket.productId.push( product.id )
    // basket.quantity.push( 1 )
  }
  
}

router.get( '/basket', (req, res) => {
  console.log( "At basket :0" )
  var li = [] // Product name, quantity

  for ( i = 0; i < basket.length; i++ ) {
    li.push( BasketItem(
      products.find( (product) => product.id == basket[i].productID ).name,
      basket[i].quantity
    ) );
    
  }
  console.log( li )
  res.render( 'basket', { order: li })
} )

// Nikolaj arbejder her //



// Til her


module.exports = router;
