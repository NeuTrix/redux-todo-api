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

router.post('/', authenticate, (req, res) => { // with auth
// router.post('/',  (req, res) => {

	let _todo = new Todo(req.body);

	_todo.save((err, todo) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(201).send({
				user: req.currentUser,
				todo,
			});
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
router.put('/:id', (req, res) => {

	let id = req.params.id;
	let item = req.body
	
	Todo.findByIdAndUpdate (id, item, { new: true }, (err, todo ) => {
		if (!todo) {
			return res.status(500)
				.json({ error:`No item with id: ${id}. Error: ${err}` });
		} else { 
			err ? res.status(500).send(err) : res.status(200).send({
				success: true, 
				message: `Successfully updated item with id: ${id} `,
				todo 
			});
		}
	});
});

// ========= * DELETE a specific item
router.delete('/:id', (req, res) => {

	let id = req.params.id;
	
	Todo.findByIdAndRemove( id, (err, todo) => {
			if(!todo) {
				return res.status(500).json({error:`This item with id: ${id} does not exist. Error produced: ${err} `});
			} else {
				Todo.remove({id: todo._id})
				let message = {
					text: `The todo with id ${todo._id} has been DELETED`
				}
				console.log("***it's gone")
				return res.status(200).send(message.text);
			}
	});
});

module.exports = router;