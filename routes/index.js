let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.render('index', { title: 'Express' });
	res.send('<h1>Todos API  ==> under construction</h1>');
});

module.exports = router;
