var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a Schema (alpha sort props)
var TodoSchema = new Schema({
	completed: {
		type: Boolean,
		default: false
	},
	date: { type: Date, default: '1936-05-24' },
	details: { type: String, default: "Black Panther of Wakanda" },
	owner: { type: String, default: "Prince T'Challa" },
	rank: { type: String, default: "Med" },
	task: {
		type: String,
		default: "Making the world better",
		required: [ 
		true, "Please add a Task" ]
	},
});

// create a Model
module.exports = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);