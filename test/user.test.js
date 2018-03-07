let should = require('should');
let mongoose = require('mongoose');
let chai = require('chai');
let expect = require('chai').expect;
let User = require('../models/user');

describe ('User property validations', () => {
		let user // define a user instance

		before(() => {
		 user = new User();
		});
	it ('... should be invalid if username is empty', (done) => {
		user.validate((err) => {
			expect(err.errors.username).to.exist;
			done()
		});
	});

	it ('... should be invalid if email is empty', (done) => {
		user.validate((err) => {
			expect(err.errors.email).to.exist;
			done()
		});
	});

	it ('... should be invalid if password is empty', (done) => {
		user.validate((err) => {
			expect(err.errors.password).to.exist;
			done()
		});
	});

});
