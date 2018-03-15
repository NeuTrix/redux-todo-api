var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema

// create the schema
var UserSchema = new Schema({

		email: { 
			default: null,
			type: String,  
			required: true, 
			index: { unique: true } 
		},
		password_digest: { 
			default: null,
			type: String, 
			// ++++++ server may hangup with this attribute enabled ++++++ 
			required: true, 
		},
		username: { 
			default: null,
			type: String, 
			required: true, 
			index: { unique: true } 
		},
		todos : [{
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}]

});

// support passport authentication
UserSchema.plugin(passportLocalMongoose);

// create and export a Model
// module.exports = mongoose.model('User', UserSchema);

// ... alternatively, to handle `overwriting` error
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
