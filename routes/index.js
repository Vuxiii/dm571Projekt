var express = require('express');
var router = express.Router();

var users = [ 
	{ name: "William" }, 
	{ name: "Marcellus" }, 
	{ name: "Nikulaus" } 
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req, res) => {
  res.render("users", { data: users } );
})

module.exports = router;
