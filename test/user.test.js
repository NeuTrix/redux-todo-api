let should = require('should');
let mongoose = require('mongoose');
let User = require('../models/user.model.js');
let db;

describe ('The User integration', () => {

	before((done) => {
		db = mongoose.connect('mongodb://localhost/test');
		// mongoose.connection.db.dropDatabase()
			done();
	});

/*  before((done) => {
	  mongoose.connection.db.dropDatabase(() => {
	  console.log('Cleaning - test database dropped');
	  });
		return done();
  });
*/
	after((done) => {
		mongoose.connection.close();
		done();
	});

	beforeEach((done) => {
		let user = new User ({
			username: 'mickey',
			password: 'mouse'
		});

		user.save((error) => {
			if (error) { 
				console.log('error', error.message);
			} else {
				console.log('no errors!');
			}
			done();
		});
	});

		it ('... can find a user by username', (done) => {
			User.findOne({ username: 'mickey'}, (err, user) => {
				user.username.should.eql('mickey');
				console.log(' username: ', user.username);
				done()
			});
		});

		afterEach((done) => {
			User.remove({}, () => {
				done();
			});
		});
});