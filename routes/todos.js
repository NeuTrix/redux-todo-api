/* eslint-env node, mocha */
let express = require('express');
let router = express.Router();
let authenticate = require('../middlewares/authenticate')

let Todo = require('../models/todo');

// ========== * READ a list of all todos (User restircted)
	router.get('/', authenticate, (req, res) => {
		let user = req.currentUser
		Todo.find({'owner': user._id})
		.exec( 
		(err, todos) => {
			if(err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).send(todos);
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
router.get('/:id', authenticate, (req, res) => {

	let id = req.params.id;
	
	Todo.findById(id, (err, todo ) => {
		if (!todo) {
			return res.status(500)
				.json({ error: true, text: `No item with id: ${id}. Error: ${err}` });
		} else { 
			// err ? res.status(500).send(err) : 
			res.status(200).send({
				success: true, 
				message: `Successfully found item with id: ${id} `,
				todo 
			});
		}
	});
});

// ========= * UPDATE a specific item
router.put('/:id', authenticate, (req, res) => {

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
router.delete('/:id', authenticate, (req, res) => {

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