var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a Schema (alpha sort props)
var TodoSchema = new Schema({
	completed: {
		type: Boolean,
		default: false
	},
	date: Date,
	details: String,
	owner: String,
	rank: String,
	task: {
		type: String,
		required: [true, "Please add a Task"]
	},

});

// create a Model
module.exports = mongoose.models.Todos || mongoose.model('Todos', TodoSchema);