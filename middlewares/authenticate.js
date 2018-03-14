let jwt = require('jsonwebtoken');
let config = require('../config/auth')
let User = require('../models/user')

module.exports = (req, res, next) => {
	let token;
	const authorizationHeader = req.headers['authorization'];
	
	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify (token, config.jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ error: 'Failed to authenticate' });
			} else {
				User.findOne ({ '_id': decoded.id }, { username:1, email:1 })
				// new User ({ '_id': decoded.id }, { username:1, email:1 })
				 	.then((user) => {
						if (!user) {
							res.status(400).json({ error: 'No such User'})
						} else {
							req.currentUser =  user;
							next();
						}
					}); 
				} // userFind
			}); //verify
	} else {
		res.status(403).json ({ error:'no token provided' })
	}
}; //mod

