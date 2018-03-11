/* eslint-env node, mocha, chai, jest */

let server = require('../app');
let mongoose = require('mongoose');
let dbSeed = require('../config/dbSeed')

let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

let User = require('../models/user');

chai.use(chaiHttp);

describe('Routes for /user resources', () => {

	const _profile = {
		username: 'Tchalla',
		email: 'tbp@wakanda.com',
		password: 'black-panther',
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

	// =========== READ an index of all user
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

	// =========== CREATE a new user item
	describe('*** CREATE the POST: "/api/users route" ', () => {

		it('...can post a new user object', (done) => {

			let _user2 = {
				username: 'Erik',
				email: 'EK@oakland.com',
				password: 'killmonger',
				password_digest: 'somethingrandomgoeshere'
			};

			chai.request(server)
				.post('/api/users/')
				.send(_user2)
				.end((err, res) => {
					expect(res.status).to.eql(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('success')
						.to.eql(true);
					expect(res.body).to.have.property('username')
						.to.eql(_user2.username);
					expect(res.body).to.have.property('_id')
						.to.be.a('string');
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



});


