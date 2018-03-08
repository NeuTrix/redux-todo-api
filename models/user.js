var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
		email: { 
			default: null,
			type: String,  
			required: true, 
			index: { unique: true } 
		},
		password: { 
			default: null,
		 type: String 
		},
		username: { 
			default: null,
			type: String, 
			required: true, 
			index: { unique: true } 
		},
});

UserSchema.plugin(passportLocalMongoose);

// create a Model
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);