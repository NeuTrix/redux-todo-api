let Todos = require('../models/todo.model');
let Users = require('../models/user');
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
	Todos.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('Todos DB cleared');
		});
	Users.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('Users DB cleared');
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

	let _todo = new Todos(_task)

	_todo.save((err, todo) => {
		console.log(todo)
	})
})

}

module.exports = { 
	Seed, 
	Close, 
	Clear
};



