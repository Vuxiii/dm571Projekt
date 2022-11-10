var express = require('express');
const axios = require('axios').default;
// axios.defaults.baseURL = 'localhost:/3000';
var router = express.Router();

class Order {
  constructor(id, productId, quantity, shipDate, status, complete ) {
    this.id = id; // int
    this.productId = productId; // int
    this.quantity = quantity; // int
    this.shipDate = shipDate; // string
    this.status = status; // enum placed, approved, delivered
    this.complete = complete; // bool
  }
  
};

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
  constructor( id, name, category, photoUrls, tags, status, inventory ) {
    this.id = id; // int
    this.name = name; // String
    this.category = category; // Category
    this.photoUrls = photoUrls; // list<string>
    this.tags = tags; // List<Tag>
    this.status = status; // enum In store, More on the way, Sold out
    this.inventory = inventory; // integer
  }
};

var users = [ 
	new User( 0, "willi", "William", "Juhl", "asdf@student.dk", "1234", "246234", "Customer" ),
	new User( 1, "marco", "Marcell", "KLitten", "marcer@student.dk", "5345", "245234", "Admin" ),
];

var categoryPande = new Category( 0, "Pander" );
var tag1 = new Tag( 0, "Rustfrit Stål" );


var products = [ 
	new Product( 0, "Pande1", categoryPande, [], tag1, "In Store", 10 ),
	new Product( 1, "Pande2", categoryPande, [], tag1, "In Store", 4 ),
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cli: axios, clickBtn: function() { 
    console.log( 'Hej' )
    // axios.post( '/products', {} ); 
    fetch('/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 78912 })
    })
    .then(function(response) { response.json() })
    .then(function(response) { console.log(JSON.stringify(response)) })
  } });
});

router.get('/users', (req, res) => {
  res.render("users", { users: users } );
  
})

router.get('/products', (req, res) => {
  res.render("products", { products: products } );
})

router.post('/products', (req, res) => {
  console.log( "button clicked :0" );
  res.end();
})


module.exports = router;
