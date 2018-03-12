
export default (req, res, next) => {
	const authorizationHeader = req.headers['Authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	} 

	if (token) {

	} else {
		res.status(403).json({error:'no token provided'})
	}
};