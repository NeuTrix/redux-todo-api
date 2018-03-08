let express = require('express');
let passport = require('passport');
let User = require('../models/user');
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

router.post('/register', function(req, res, next) {


	User.register(
		new User({ 
			username: req.body.username,
			email: req.body.email,
		}),
		req.body.password,
		function(err, account) {
			if (err) {
			// return res.status(500).send(err.message).render('register', { error : err.message });
			return res.render('register', { error : err.message });
			}
			
		passport.authenticate('local')(req, res, function() {
			req.session.save(function(err){
				if (err) {
					return next(err);
				}
				// res.redirect('/');
			res.status(201).send(res.user).redirect('/');

			});
		});
	});
});

router.get('/login', function(req, res) {
	res.render('login', { user: req.user });
})

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
})

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

router.get('/ping', function(req, res) {
	res.status(200).send('pong!');
});

module.exports = router;
