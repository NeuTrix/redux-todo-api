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
		password: 'black-panther'
	};

	beforeEach(() => {
		dbSeed.Seed(3);
		new User(_profile)
	}); 

	afterEach(() => {
		dbSeed.Clear();
	});

	// =========== READ an index of all user
	describe.only('*** READ the GET:"api/users route" ', () => {

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
	describe.only('*** CREATE the POST: "/api/users route" ', () => {

		it('...can post a new user object', (done) => {

			chai.request(server)
				.post('/api/users/')
				.send(_profile)
				.end((err, res) => {
					expect(res.status).to.eql(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('success')
						.to.eql(true);
					expect(res.body).to.have.property('username')
						.to.eql('Tchalla')
					expect(res.body).to.have.property('_id')
						.to.be.a('string')
				done(); 
				}); 	
		}); 
	});
		
	// =========== FIND a specific user item
	xdescribe('*** READ the GET "/users/:id" route', () => {

			it ('finds hime', (done) => {

		User.findOne({username: "Tchalla"},(user) => {
			console.log(user)
		});
		done()
			});
		// User.findOne({ },(err, user) => {
			// let _id = user.id
			// console.log(_id)
		// console.log(user)
		/*	it('... can find a specific user item', (done) => {

				chai.request(server)
					.get('/api/users/' + user.id)
					.send(user)
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.an('object');
						expect(res.body).to.have.property('task');
						expect(res.body).to.have.property('completed');
						expect(res.body).to.have.property('completed');
					done();
				}); //chai*/
			// }); //it
		// }); // User
	}); //desc


	// =========== UPDATE a specific user  
	describe('*** UPDATE a specific user: "/users/:id" route', () => {
		it('... can update an item', (done) => {

			let _user = new User(_task);
			let oldId = _user._id.toString();

			_user.save((err, user) => {

				chai.request(server)
					.put('/api/users/' + user.id)
					.send({
						task: 'Test Task:  Update Item',
						completed: true,
						owner: 'Johara Bell',
					})

					.end((err, res) => {
						expect(res.body.completed).to.eql(true);
						expect(res.status).to.eql(200);
						expect(res.body).to.have.property('_id');
						expect(res.body._id).to.equal(oldId);
						expect(res.body).to.have.property('task');
						expect(res.body.task).to.eql('Test Task:  Update Item');
						expect(res.body).to.have.property('owner');
						expect(res.body.owner).to.eql('Johara Bell');
						expect(res.body).to.have.property('completed');
						// expect(res.body.test).to.eql(false);
						expect(res.body).to.be.an('object');
					done();		
					});
			});
		});
	});

	// =========== DELETE a specific user  
	describe('*** DELETE a specific user: "/users/:id" route', () => {

		it(' can delete an item', (done) => {
			
			let _user = new User(_task);

			_user.save((err, user) => {

				chai.request(server)
					.delete('/api/users/' + user.id)
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.an('object');
						// +++BUG:
						console.log(res.text);
						expect(res.text).to.exist;
						// expect(res).to.have.property('message').eql('The user with id 5a95d10d26deea15d4e9b8a1 has been deleted');
					done();
					});
			});
		});
	});

});


