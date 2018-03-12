/* eslint-env node, mocha */
let express = require('express');
let passport = require('passport');
let commonValidations = require('../helpers/signupValidator');
let bcrypt = require('bcrypt');
let isEmpty = require('lodash/isEmpty');

let User = require('../models/user');

let router = express.Router();

const validateInput = function(data, otherValidations) {
	// gather validation errors
	let { errors } = otherValidations(data);

	return User.findOne( 
		{ $or: [{ 'username': data.username }, { 'email': data.email } ]}), 
		(err, user) => {
			if (user) {
			if (user.username === data.username) {
				errors.username = 'This username already exists.'
			}
			if (user.email === data.email)
				errors.email = 'This email already exists.'
			}
		};

	return { errors, isValid: isEmpty(errors)};
}


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

router.post('/', (req, res) => {
	/*validateInput(req.body, commonValidations).then(({ errors, isValid }) => {*/
		const { errors, isValid } = commonValidations (req.body)

		if (!isValid) {
			
			res.status(400).json(errors)

		} else {
			
			const { email, username, password } = req.body;

			bcrypt.hash(password, 10)
				.then(
					password_digest => {
						new User ({ email, password_digest, username })
						.save()
				  	.then(user => res.json({ 
				  		success: true, 
					  	username: username,
					  	_id: user._id 
					  }))
			 		.catch(err => res.status(501)
			 		.send({ error: err.message }))
				})
				
		 		.catch(err => res.status(501).json({ error: err.message }))
		};
});

/*router.post('/', (req, res) => {
	validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
		if (isValid) {
			const { email, username, password } = req.body;
			bcrypt.hash(password, 10)
				.then(
					password_digest => {
						new User ({ email, password_digest, username })
						.save()
				  	.then(user => res.json({ 
				  		success: true, 
					  	username: username,
					  	_id: user._id 
					  }))
			 		.catch(err => res.status(501)
			 		.send({ error: err.message }))
				})
		 		.catch(err => res.status(501).json({ error: err.message }))
		} else {
			res.status(400).json(errors);
		}
	});
});*/

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
