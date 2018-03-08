var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
		email: { type: String,  required: true, index: { unique: true } },
		password: { type: String },
		username: { 
			type: String, 
			required: true, 
			index: { unique: true } 
		},
});

UserSchema.plugin(passportLocalMongoose);

// create a Model
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);