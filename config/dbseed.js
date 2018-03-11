let Todo = require('../models/todo');
let User = require('../models/user');
let _ = require('lodash');
let Promise = require('bluebird');
let faker = require('faker');

let mongoose = require('mongoose');

// ========= test db
// let mongoDB = 'mongodb://Tester:test2015@ds239117.mlab.com:39117/todo-test-db';
// ========= default db
let mongoDB = 'mongodb://Tester:test2015@ds135537.mlab.com:35537/react-redux-todo';

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
			err ? console.error.bind(console) : console.log('Todo DB cleared');
		});
	User.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('User DB cleared');
		});
	console.log("********** db Cleared ******")
}

// ========= The Seed Module


const Seed = (count) => {

_.times(count,() => {

	let _task = {
		owner: faker.name.lastName(),
		task: faker.lorem.sentence(),
		details: faker.lorem.paragraph(),
		rank: faker.random.arrayElement(['High', 'Med', 'Low']),
		date: faker.date.future(),
		completed: faker.random.boolean()
	};

	let _profile = {
		username: faker.name.findName(),
		email: faker.internet.email(),
		password_digest: faker.internet.password()
	};

	let _todo = new Todo(_task)
	_todo.save((err, todo) => {
		console.log(todo)
		err  => console.log(err) 
		
	})

	let _user = new User(_profile)
	_user.save((err, user) => {
		err  => console.log(err) 
		console.log(user)
	})
})

}

module.exports = { 
	Seed, 
	Close, 
	Clear
};



