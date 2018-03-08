/* eslint-env node, mocha */
let express = require('express');
let passport = require('passport');
let router = express.Router();
let User = require('../models/user');

// ========== * READ a list of all users
router.get('/', (req, res) => {
	// res.send('the GET/ rte');
	User.find({ },(err, users) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(users);
		}
	});
});

// ========= * CREATE a new user item
/*router.post('/', (req, res) => {

	let _user = new User(req.body);

	_user.save((err, user) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(user);
		}
	});
});*/

router.post('/', function(req, res, next) {

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

// ========= * READ a specific user item
router.get('/:id', (req, res) => {

	User.findById(
		req.params.id, 
		(err, user) => {
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(user);
			}
	});
});

// ========= * UPDATE a specific item
router.put ('/:id', (req, res) => {

		User.findByIdAndUpdate (
			req.params.id, 
			req.body, 
			{ new: true }, 
			(err, user ) => {

			if(err) {
				res.status(500).send(err);
			}
				res.status(200).send(
					user);
		});
	}
);

// ========= * DELETE a specific item
router.delete('/:id', (req, res) => {

	User.findByIdAndRemove(req.params.id, (error, user) => {

		if(error) {
			return res.status(500).send(err)
		} else {
			let message = {
				text: `The user with id ${user._id} has been deleted`
			}
			console.log("***it's gone")
			return res.status(200).send(message.text);
		}
	});

});

module.exports = router;