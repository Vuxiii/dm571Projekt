var express = require('express');
var router = express.Router();

var users = [ 
	{ name: "William" }, 
	{ name: "Marcellus" }, 
	{ name: "Nikulaus" } 
];

/* GET users listing. */
router.get('/', function(req, res, next) {
	// res.send('respond with a resource');
	
	// Request all the users. Talk with db


	// Return the list of users.
	// var s = "";
	// users.forEach( (user) => s += "<p>" + user + "</p>" );
	res.render( 'users', { data: users } );
});

// router.get( '/all', function(req, res, next) {
// 	console.log( "asdasdads" );	
// 	// users.forEach( (user) => res.append('index', { name: user } ) );
// 	res.render( 'users', { data: users } );
// });

module.exports = router;