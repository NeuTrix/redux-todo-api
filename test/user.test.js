let should = require('should');
let mongoose = require('mongoose');
let Account = require('../models/account.js');
let db;

describe ('Account', () => {

	before((done) => {
		db = mongoose.connect('mongodb://localhost/test');
			done();
	});

	after((done) => {
		mongoose.connection.close();
		done();
	});

	beforeEach((done) => {
		let account = new Account ({
			username: 'mickey',
			password: 'mouse'
		});

		account.save((error) => {
			if (error) { 
				console.log('error', error.message);
			} else {
				console.log('no errors!');
			}
			done();
		});
	});

		it ('... can find a user by username', (done) => {
			Account.findOne({ username: 'mickey'}, (err, account) => {
				account.username.should.eql('mickey');
				console.log(' username: ', account.username);
				done()
			});
		});

		afterEach(() => {
			Account.remove({}, () => {
				done();
			});
		});
});