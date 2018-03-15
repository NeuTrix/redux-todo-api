var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a Schema (alpha sort props)
var TodoSchema = new Schema({
	completed: {
		type: Boolean,
		default: false
	},
	date: { type: Date, default: '1936-05-24' },
	details: { type: String, default: "Default Details" },
	rank: { type: String, default: "Med" },
	task: {
		type: String,
		default: "Default Task",
		required: [ 
		true, "Please add a Task" ]
	},
	owner: { 
		type: Schema.Types.ObjectId, 
		ref: 'User',
	}
});

// create a Model
module.exports = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);