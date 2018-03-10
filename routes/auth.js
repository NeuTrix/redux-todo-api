
/* eslint-env node, mocha */
let express = require('express');
let passport = require('passport');
let validateInput = require('../helpers/signupValidator');
let bcrypt = require('bcrypt');

let User = require('../models/user');

let router = express.Router();

// ========== * READ a list of all users

router.post('/', (req, res) => {

	const { identifier } = req.body;

	User.findOne( 
		{ $or: [ { 'username': identifier }, { 'email': identifier }] } ,
	 'email username',
		(err, user) => {
			if(!user) {
				res.status(401).json({ error: `Can't find login for ${identifier} \n ${ err } ` })
			} else {
				res.status(200).send( user )
			}
	})
});

// // ========= * CREATE a new user item
// // new and save are preferable to create for control flow

// router.post('/', function(req, res) {
// 	const { email, username, password } = req.body;

// 	// create a bcrypt password and new User
// 	bcrypt.hash(password, 10)
// 		.then(
// 			password_digest => {
// 				new User ({ email, password_digest, username })
// 				.save()
// 		  	.then(user => res.json({ success: true }))
// 		 		.catch(err => res.status(501).json({ error: err }))
// 			}	
// 		)
//  		.catch(err => res.status(501).json({ error: err }))
// });

// // ========= * READ a specific user item
// router.get('/:id', (req, res) => {

// 	User.findById(
// 		req.params.id, 
// 		(err, user) => {
// 			if(err) {
// 				res.status(500).send(err);
// 			} else {
// 				res.status(200).send(user);
// 			}
// 	});
// });


module.exports = router;
