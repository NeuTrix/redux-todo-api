
/* eslint-env node, mocha */
let express = require('express');
let passport = require('passport');
let validateInput = require('../helpers/signupValidator')
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
// new and save are preferable to create for control flow
// ... a safety route without validation or authetication ...
router.post('/', (req, res) => {

	// validate the request body
	// create a new user
	let user = new User(req.body);

	// validate a save to the database
	user.save((err) => {
		if (err) {
			// handle error if not
			res.status(501).send(err)
		} else {
			// return the new user if saved
			res.status(201).send(user)
		}
	});	

	// authenticate the user with a hashed password
});




// +++++++++   +++++++++ 

/*router.post('/', function (req, res, next) {

	const { errors, isValid } = validateInput(req.body);

	if (!isValid) {
		res.status(400).json(errors)
	} else {

		User.register(

			new User({ 
				username: req.body.username,
				email: req.body.email,
			}),

			req.body.password,

			function (err, account) {

				if (err) {
					res.status(501).send(err.message);
					return res.render('register', { error : err.message });
				} else {

					passport.authenticate('local'),

					function (req, res) {

						req.session.save(function (err) {

							if (err) {
								return next(err);
							} else {
								res.redirect('/');
								return res.status(201).send(res.user)
							} // else 3

						}); // func 4, save

					}; // func 3

				} //else 2
			} // func 2
		); //register
	} //else 1
}); //post, func 1*/

// +++++++++   +++++++++ 

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
router.put('/:id', (req, res) => {

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