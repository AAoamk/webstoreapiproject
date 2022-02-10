const mongoose = require("mongoose")

const listschema = mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	category: {
		type: String,
        enum: ['clothing','cars','etc'], //joke
		require: true
	},
    location: {
		type: String,
		require: true
	},
    price: {
		type: String,
		require: true
	},
    dateOfPost: {
		type: Date, 
		default: Date.now
	},
    deliveryType: {
		type: String,
        enum: ['shipping', 'pickup'],
		require: true
	},
	/*
	userReference: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
	},
	*/
},{ versionKey: false,timestamps: true })

module.exports = mongoose.model("lists", listschema)