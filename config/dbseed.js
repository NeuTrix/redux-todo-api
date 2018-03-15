let Todo = require('../models/todo');
let User = require('../models/user');
let _ = require('lodash');
let Promise = require('bluebird');
let faker = require('faker');

let mongoose = require('mongoose');

// ========= test db
// let mongoDB = 'mongodb://Tester:test2015@ds239117.mlab.com:39117/todo-test-db';

// +++++++++ mongoose +++++++++ 
// local db
let mongoDB = 'mongodb://localhost/test'

// ========= default db
// let mongoDB = 'mongodb://Tester:test2015@ds135537.mlab.com:35537/react-redux-todo';

// establish pending connection to db
mongoose.connect(mongoDB);
// use the global Promise library
// mongoose.Promise = global.Promise;
// default connection
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const Close = () => {
	mongoose.connection.close()
	console.log("********** Connection Closed ******")
}

const Clear =() => {
	db.models = { }
	Todo.remove({ },(err) => {
			(err) => console.error.bind(console) 
		});
	User.remove({ },(err) => {
			(err) => console.error.bind(console) 
		});
	return console.log('** db Cleared **')
}

// ========= The Seed Module


const Seed = (count) => {

	let _profile = {
			username: faker.name.findName(),
			email: faker.internet.email(),
			password_digest: faker.internet.password()
		};

		let _user = new User(_profile)
		_user.save((err, user) => {
			err  => console.log(err) 
			console.log(user)
		})

	_.times(count,() => {

		let _task = {
			owner: _user._id,
			task: faker.lorem.sentence(),
			details: faker.lorem.paragraph(),
			rank: faker.random.arrayElement(['High', 'Med', 'Low']),
			date: faker.date.future(),
			completed: faker.random.boolean(),
			ref: {testId: '1963'}

		};

		let _todo = new Todo(_task)
		_todo.save((err, todo) => {
			// console.log(todo)
			err  => console.log(err) 
		})
	})
}

module.exports = { 
	Seed, 
	Close, 
	Clear
};



