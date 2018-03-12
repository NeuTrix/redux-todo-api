module.exports = (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	} 

	if (token) {
		// validate the token
	} else {
		res.status(403).json({error:'no token provided'})
	}
};

// module.exports = authenticate