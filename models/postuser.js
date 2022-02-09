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
})
userschema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
  })
module.exports = mongoose.model("Post", userschema)