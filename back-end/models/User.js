var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type:String,
		unique: true,
		required:[true, 'need to provide a username']
	},
	email: {
		type:String, 
		required:[true, 'need to provide a valid email']
	},
	password: String,
	token: String,
	completed: {
		type: Array,
		default: null
	},
	dailyPoints: {
		type: Number,
		default: null
	},
	totalPoints: {
		type: Array,
		default: null
	},
	avatar: {
		type: String,
		default: null
	},
	level: {
		type: String,
		default: null
	},
	quizScores: {
		name: { type: String, default: null }, 
		score: { type: Number, default: null } 
	}
});

var options = ({missingUsernameError: "Wrong Username", missingPasswordError: "Wrong Password"});
userSchema.plugin(plm,options);

module.exports = mongoose.model('User', userSchema);