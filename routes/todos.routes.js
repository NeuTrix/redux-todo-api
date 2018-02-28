/* eslint-env node, mocha */
let express = require('express');
let router = express.Router();
let Todos = require('../models/todos.model');

// ========== * READ a list of all todos
router.get('/', (req, res) => {
	// res.send('the GET/ rte');
	Todos.find({ },(err, todos) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(todos);
		}
	});
});

// ========= * CREATE a new todo item
router.post('/', (req, res) => {

	let _todo = new Todos(req.body);

	_todo.save((err, todo) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(todo);
		}
	});
});

// ========= * READ a specific todo item
router.get('/:id', (req, res) => {

	let id = req.params.id;

	Todos.findById({ "_id": id }, (err, todo) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(todo);
		}
	});
});

// ========= * UPDATE a specific item
router.put('/:id', (req, res) => {

	let id = req.params.id;

	Todos.findById({ "_id": id }, (err, todo) => {

		if(err) {
			res.status(500).send(err);

		} else {
			todo.owner 	 = req.body.owner	 	|| todo.owner;
			todo.task		 = req.body.task 	 	|| todo.task;
			todo.details = req.body.details	|| todo.details;
			todo.rank 	 = req.body.rank		|| todo.rank;
			todo.date 	 = req.body.date		|| todo.date;
			todo.completed 	= req.body.completed || todo.completed;

			todo.save((err, _todo) => {
				if(err) {
					res.status(500).send(err);
				} 
					res.status(200).send(_todo);
			});
		}
	});
});

// ========= * UPDATE a specific item
router.delete('/:id', (req, res) => {

	Todos.findByIdAndRemove(req.params.id, (error, todo) => {

		if(error) {
			return res.status(500).send(err)
		} else {
			let message = {
				text: `The todo with id ${todo._id} has been deleted`
			}
			console.log("***it's gone")
			return res.status(200).send(message.text);
		}
	});

});

module.exports = router;