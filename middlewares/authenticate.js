let jwt = require('jsonwebtoken');
let config = require('../config/auth')
let User = require('../models/user')

module.exports = (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;
	
	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	} 

	if (token) {
		// validate the token
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ error: 'Failed to authenticate' });
			} else {
			 User.findOne(
			 		{ '_id': decoded.id }, 
			 		{ username:1, email:1 }
		 		)
				.then((user) => {
					if (!user) {
						res.status(400).json({ error: 'No such User'})
					}
					req.currentUser =  user;
					next();
				}); 
			}
		});

	} else {
		res.status(403).json({ error:'no token provided' })
	}
};

// module.exports = authenticate