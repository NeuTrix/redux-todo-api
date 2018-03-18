/* eslint-env node, mocha */
let express = require('express');
let passport = require('passport');
let validateInput = require('../helpers/signupValidator');
let commonValidations = require('../helpers/signupValidator');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')
let config = require('../config/auth')
let router = express.Router();

let User = require('../models/user');


// +++++++++  User Registration  +++++++++ 


router.post('/register', (req, res) => {
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
				  		email: user.email,
					  	_id: user._id, 
					  	username: username,
					  }))
			 		.catch(err => res.status(501)
			 		.send({ error: err.message }))
				})
				
		 		.catch(err => res.status(501).json({ error: err.message }))
		};
});

// +++++++++  User LOGIN  +++++++++ 

router.post('/login', (req, res) => {

	const { identifier, password } = req.body;

	User.findOne( 
		{ $or: [ 
			{ 'username': identifier }, 
			{ 'email': identifier } 
		] } , (err, user) => {

			if(user) {
				let bHash = user.password_digest
				let verified = bcrypt.compareSync(password, bHash)
					if (verified) {
						 const token = jwt.sign({
							 	// do not include any private info for a token
							 	_id: user._id,
							 	username: user.username
						 }, config.jwtSecret);

						res.status(200).json( { 
							token,
							success: true, 
						}) 
					} else {
						res.status(400)
							.json({ errors: { form: 'Invalid Credentials' } });
					}
			} else {
				res.status(400)
					.json({ errors: { form: 'Invalid Credentials' } })
			}
	})
});




module.exports = router;
