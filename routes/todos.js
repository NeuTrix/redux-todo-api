/* eslint-env node, mocha */
let express = require('express');
let router = express.Router();
let authenticate = require('../middlewares/authenticate')

let Todo = require('../models/todo');

// ========== * READ a list of all todos
router.get('/', (req, res) => {
	// res.send('the GET/ rte');
	Todo.find({ },(err, todos) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(todos);
		}
	});
});

// ========= * CREATE a new todo item
router.post('/', authenticate,  (req, res) => {

	let _todo = new Todo(req.body);

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

	Todo.findById(
		req.params.id, 
		(err, todo) => {
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(todo);
			}
	});
});

// ========= * UPDATE a specific item
router.put ('/:id', (req, res) => {

		Todo.findByIdAndUpdate (
			req.params.id, 
			req.body, 
			{ new: true }, 
			(err, todo ) => {

			if(err) {
				res.status(500).send(err);
			}
				res.status(200).send(
					todo);
		});
	}
);

// ========= * DELETE a specific item
router.delete('/:id', (req, res) => {

	Todo.findByIdAndRemove(req.params.id, (err, todo) => {

		if(err) {
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