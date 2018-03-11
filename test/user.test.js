/* eslint-env node, mocha, chai, jest */
let server = require('../app');
let mongoose = require('mongoose');
let dbSeed = require('../config/dbSeed')

let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;

let User = require('../models/user');

chai.use(chaiHttp);

describe('Routes for /user resources', () => {

	const _profile = {
		username: 'Tchalla',
		emailConfirm: 'tbp@wakanda.com',
		email: 'tbp@wakanda.com',
		password: 'black-panther',
		passwordConfirm: 'black-panther',
		password_digest: 'somethingrandomgoeshere'
	}; 

	let _user

	beforeEach(() => {
		dbSeed.Clear();
		dbSeed.Seed(3);
		_user = new User(_profile)
		_user.save()
	}); 

	afterEach(() => {
		dbSeed.Clear();
	});

	// =========== READ an index of all users
	describe('*** READ the GET:"api/users route" ', () => {

		it('... returns a list of all current users', (done) => {
			chai.request(server)
				.get('/api/users')
				.end((err, res) => {
					// console.log(res.body[1])
					expect(res.status).to.eql(200);
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.above(0);
				done();
				});
		});
 	});

	// =========== FIND a specific user item
	describe('*** READs the GET "/users/:id" route', () => {

			it ('can find a user by _id', (done) => {
				chai.request(server)
					.get('/api/users/' + _user._id)
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.an('object');
						expect(res.body).to.have.property('username')
							.to.eql(_user.username);
						expect(res.body).to.have.property('email')
							.to.eql(_user.email);
						expect(res.body).to.have.property('password_digest')
							.to.eql(_user.password_digest);
					done()
					})
			});
	}); //desc

	// =========== CREATE a new user item
	describe('*** USER REGISTRATION route POST: "/api/users" ', () => {

		it ('...can post a new user object', (done) => {

			let user = {
				username: 'Erik',
				email: 'Erik@oakland.com',
				emailConfirm: 'Erik@oakland.com', // good address
				password: 'killmonger',
				passwordConfirm: 'killmonger',
				password_digest: 'somethingrandomgoeshere'
			};

			chai.request(server)
				.post('/api/users/')
				.send(user)
				.end((err, res) => {
					expect(res.status).to.eql(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('success')
						.to.eql(true);
					expect(res.body).to.have.property('username')
						.to.eql(user.username);
					expect(res.body).to.have.property('_id')
						.to.be.a('string');
				done(); 
				}); 	
		});

		it ('... validates email matching', (done) => {

			let user = {
				username: 'Erik',
				email: 'Erik@oakland.com',
				emailConfirm: 'NotGood@oakland.com', // bad confirm
				password: 'killmonger',
				passwordConfirm: 'killmonger',
				password_digest: 'somethingrandomgoeshere'
			};

			chai.request(server)
				.post('/api/users/')
				.send(user)
				.end((err, res) => {
					expect(res.status).to.eql(400);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('emailConfirm')
						.to.eql('Emails do not match')
				done(); 
				}); 	
		}); 

		it ('... validates password matching', (done) => {

			let user = {
				username: 'Erik',
				email: 'Erik@oakland.com',
				emailConfirm: 'Erik@oakland.com',
				password: 'killmonger',
				passwordConfirm: 'knuckleHead', // bad confirm
				password_digest: 'somethingrandomgoeshere'
			};

			chai.request(server)
				.post('/api/users/')
				.send(user)
				.end((err, res) => {
					expect(res.status).to.eql(400);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('passwordConfirm')
						.to.eql('Passwords do not match')
				done(); 
				}); 	
		}); 

		it ('... won\'t permit a duplicate in FULL', (done) => {
			let user = {
				username: 'Tchalla',
				emailConfirm: 'tbp@wakanda.com',
				email: 'tbp@wakanda.com',
				password: 'black-panther',
				passwordConfirm: 'black-panther',
				password_digest: 'somethingrandomgoeshere'
			};

			chai.request(server)
				.post('/api/users/')
				.send(user)
				.end((err, res) => {
					expect(res.status).to.eql(501);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('error')
						.to.be.a('string');
				done(); 
				}); 
		});

		it ('... won\'t permit a duplicate USERNAME', (done) => {
			let _user = {
				username: 'Tchalla', // duplicate
				email:'pm@harlem.com',
				emailConfirm:'pm@harlem.com',
				password:'powerMan',
				passwordConfirm:'powerMan',
				password_digest: '98798sdansJLJ-I-MADE_THIS-sjjs-UP'
			};

			chai.request(server)
				.post('/api/users/')
				.send(_user)
				.end((err, res) => {
					expect(res.status).to.eql(501);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('error')
						.to.be.a('string');
				done(); 
				}); 
		});

		it ('... won\'t permit a duplicate EMAIL', (done) => {
			let _user = {
				username:'LukeCage', 
				emailConfirm: 'tbp@wakanda.com', // dupllicate
				email: 'tbp@wakanda.com', // dupllicate
				password:'powerMan',
				passwordConfirm:'powerMan',
				password_digest: '98798sdansJLJ-I-MADE_THIS-sjjs-UP'
			};

			chai.request(server)
				.post('/api/users/')
				.send(_user)
				.end((err, res) => {
					expect(res.status).to.eql(501);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('error')
						.to.be.a('string');
				done(); 
				}); 
		});
	});

	// =========== LOGIN a new user (AUTH)

	xdescribe ('The user LOGIN route, "api/auth', () => {

		it ('... can log in a user w/ a pwd & username', (done) => {
			// console.log(_user)
			let login = { 
					identifier: _user.username, 
					password: _user.password
				}
			chai.request(server)
				.post('/api/auth')
				.send(login)
				.end((err, res) => {
					// console.log(res.body)
					// console.log(err)
					expect(res.status).to.eql(200);
					// expect(res.body).to.be.an('object');					
					expect(res.body).to.have.property('success')
						.to.eql(true);
						done()
				});
		});	
		it ('... can log in a user w/ a pwd and email', () => {

		});	

		it ('... returns a JWT token', () => {

		});	

	});
});


