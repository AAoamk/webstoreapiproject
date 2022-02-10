const mongoose = require("mongoose")

const userschema = mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		  type: String,
		  minlength: 10,
		  require: true
	},
},{ versionKey: false,timestamps: true  })

module.exports = mongoose.model("User", userschema)