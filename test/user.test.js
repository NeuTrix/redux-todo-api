let should = require('should');
let mongoose = require('mongoose');
let chai = require('chai');
let expect = require('chai').expect;
let User = require('../models/user');

describe ('User empty property validations', () => {
		let user = new User()// define a user instance

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

xdescribe ('User populated prop validations', () => {

	/*let user1 = new User({
		username: 'BlackPantherLives',
		email: 'blackpanther@wakanda.com',
		password: 'BlackPantherLives'
	})*/


	xit ('... does not allow a duplicate user name', (done) => {
		let user2 = new User({
			username: 'BlackPantherLives',
			email: 'blackpanther@wakanda.com',
			password: 'KillmongerRules'
		})

		user2.validate((err) => {
			expect(err.errors.username).not.to.exist;
			done()
		});
		

	});
});
