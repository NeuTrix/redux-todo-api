var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require(passport-local-mongoose)

// create a Schema (alpha sort props)
var UerSchema = new Schema({
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
module.exports = mongoose.models.Todos || mongoose.model('Todos', UerSchema);