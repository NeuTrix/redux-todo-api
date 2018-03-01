/* eslint-env node, mocha, chai, jest */


let server = require('../app');
let mongoose = require('mongoose');

let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

let Todos = require('../models/todos.model');

chai.use(chaiHttp);

xdescribe('Routes for /todos resources', () => {

	const _task = {
		task: 'Test Task: Hitting that route, yo!',
		owner: 'Walker',
		completed: false
	};

	/*beforeEach((done) => {
		Todos.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('DB cleared');
			done();
		});
	}); */

	/*after((done) => {
		Todos.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('DB cleared');
			done();
		});
	});*/

	// =========== READ an index of all todos
	describe('*** READ index of all todos: "/todos" route', () => {

		it('... returns a list of all current todos', (done) => {

			chai.request(server)
				.get('/api/todos')
				.end((err, res) => {
					expect(res.status).to.eql(200);
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.above(0);
				});
					done();
		});
	});

	// =========== CREATE a new todo item
	describe('*** CREATE a new todo item: "/todos" route', () => {

		it('...can create a new todo item', (done) => {

			chai.request(server)
				.post('/api/todos/')
				.send(_task)
				.end((err, res) => {
					expect(res.status).to.eql(201);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('task');
					expect(res.body).to.have.property('completed');
					expect(res.body).to.have.property('_id');
					expect(res.body._id).to.be.a('string');
				}); 	
					done();
		}); 
	});
		
	// =========== FIND a specific todo item
	xdescribe('*** READ a specific todo item: "/todos/:id" route', () => {
		it('... can find a specific todo item', (done) => {
			let _todo = new Todos(_task);
			let testTask;

			_todo.save((err, todo) => {
				chai.request(server)
					.get('/api/todos/' + todo.id)
					.send(todo)
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.an('object');
						expect(res.body).to.have.property('task');
						expect(res.body).to.have.property('completed');
						expect(res.body).to.have.property('completed');
						done();
					}); 
			}); 
		}); 

	}); 

	// =========== UPDATE a specific todo  
	describe('*** UPDATE a specific todo: "/todos/:id" route', () => {
		it('... can update an item', (done) => {

			let _todo = new Todos(_task);
			let oldId = _todo._id.toString();

			_todo.save((err, todo) => {

				chai.request(server)
					.put('/api/todos/' + todo.id)
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
					});
						done();		
			});
		});
	});

	// =========== DELETE a specific todo  
	describe('*** DELETE a specific todo: "/todos/:id" route', () => {

		it(' can delete an item', (done) => {
			
			let _todo = new Todos(_task);

			_todo.save((err, todo) => {

				chai.request(server)
					.delete('/api/todos/' + todo.id)
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.an('object');
						// +++BUG:
						console.log(res.text);
						expect(res.text).to.exist;
						// expect(res).to.have.property('message').eql('The todo with id 5a95d10d26deea15d4e9b8a1 has been deleted');
						done();
					})
			});
		});
	});

});


