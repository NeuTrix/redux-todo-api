let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	// res.send('<h1>Todos API  ==> under construction</h1>');
	res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { });
})

router.post('/register', function(req, res) {
	Account.register(
		new Account({username: req.body.username }),
		req.body.password,
		function(err, account) {
			if (err) {
				return res.render('register', { account: account });
			}
			passport.authenticate('local')(req, res, function() {
				res.redirect('/');
			});
	});
});



module.exports = router;
