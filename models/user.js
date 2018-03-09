var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
		email: { 
			default: null,
			type: String,  
			required: true, 
			index: { unique: true } 
		},
		password: { 
			default: null,
			type: String, 
			// required: true, 
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
// module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);