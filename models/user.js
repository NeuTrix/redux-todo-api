var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// create the schema
var UserSchema = new mongoose.Schema({
		email: { 
			default: null,
			type: String,  
			required: true, 
			index: { unique: true } 
		},
		password_digest: { 
			default: null,
			type: String, 
			// +++++++++ server hangsup with this attribute  +++++++++ 
			// required: true, 
		},
		username: { 
			default: null,
			type: String, 
			required: true, 
			index: { unique: true } 
		},
});

// support authentication
UserSchema.plugin(passportLocalMongoose);

// create and export a Model
module.exports = mongoose.model('User', UserSchema);

// ... alternatively, 
// module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
