let express = require('express');
let passport = require('passport');
let Account = require('../models/account');
let router = express.Router();
let Validator = require('validator');
let isEmpty = require('lodash/isEmpty');


function validateInput(data) {
	let errors = { };

	if (Validator.isEmpty(data.username)) {
		errors.username = 'This field is required'
	} 

	// if (Validator.isEmpty(data.email)) {
	// 	errors.email = 'Email format is invalid'
	// }

	// if (!Validator.isEmail(data.email) {
	// 	errors.email = 'This field is required'
	// }

	/*if (Validator.isEmpty(data.emailConfirm)) {
		errors.emailConfirm = 'This field is required'
	}

	if (!Validator.equals(data.email, data.emailConfirm)) {
		errors.passwordConfirm = 'emails must match'
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'This field is required'
	}

	if (Validator.isEmpty(data.passwordConfirm)) {
		errors.passwordConfirm = 'This field is required'
	}

	if (!Validator.equals(data.password, data.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match'
	}*/

	return { 
		errors,
		isValid: isEmpty(errors)
	}
}

/* GET home page. */
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	// res.send('<h1>Todos API  ==> under construction</h1>');
	res.send("Hey Validator!!")

	res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { });
})

router.post('/register', function(req, res, next) {
	const { errors, isValid } = validateInput(req.body);

	if (!isValid) {
		res.status(400).json(errors);
	}
	Account.register(
		new Account({username: req.body.username }),
		req.body.password,
		function(err, account) {
			if (err) {
				return res.render('register', { error : err.message });
			}
			
		passport.authenticate('local')(req, res, function() {
			req.session.save(function(err){
				if (err) {
					return next(err);
				}
				res.redirect('/');
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
