/* eslint-env node, mocha */
let Validator = require('validator');
let isEmpty = require('lodash/isEmpty')

let User = require('../models/user.model');

/*function validateInput(data) {
	let errors = { };

	if (Validator.isNull(data.username)) {
		errors.username = 'This field is required'
	} 

	if (Validator.isNull(data.email)) {
		errors.email = 'Email format is invalid'
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'This field is required'
	}

	if (Validator.isNull(data.emailConfirm)) {
		errors.emailConfirm = 'This field is required'
	}

	if (!Validator.equals(data.email, data.emailConfirm)) {
		errors.passwordConfirm = 'emails must match'
	}

	if (Validator.isNull(data.password)) {
		errors.password = 'This field is required'
	}

	if (Validator.isNull(data.passwordConfirm)) {
		errors.passwordConfirm = 'This field is required'
	}

	if (!Validator.equals(data.password, data.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match'
	}

	return { 
		errors,
		isValid: isEmpty(errors)
	}
}*/


module.exports = router;