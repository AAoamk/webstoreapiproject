const mongoose = require('mongoose')
const User = require('./user')

const postingSchema = new mongoose.Schema({
	title: { type: String, unique: true},
    description: { type: String,},
	category: { type: String, enum: ['clothing','cars','etc'], require: true },
	location: { type: String,enum: ['helsinki','turku', 'oulu'],require: true },
	price: { type: String, require: true},
	deliveryType: {	type: String, enum: ['shipping', 'pickup'],	require: true},
	userReference: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
},{ versionKey: false,timestamps: true })

  module.exports = mongoose.model('Listing', postingSchema)