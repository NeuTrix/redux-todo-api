let jwt = require('jsonwebtoken');
let config = require('../config/auth')


module.exports = (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	} 

	if (token) {
		// validate the token
		jwt.verify(token, auth.jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ error: 'Failed to authenticate' });
			} 
		});

	} else {
		res.status(403).json({error:'no token provided'})
	}
};

// module.exports = authenticate