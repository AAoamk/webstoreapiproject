const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: { type: String, unique: true },
	fullname: { type: String },
	phonenumber: { type: String },
	email: { type: String },
	hashedPassword: { type: String },
	postings: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: 'posts'
		}
	  ],
},{ versionKey: false,timestamps: true  })


const User = mongoose.model('User', userSchema)

module.exports = User