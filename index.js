const express = require("express")
const http = require('http')
const mongoose = require("mongoose")
const routes = require("./routes")
require('dotenv').config()
const PORT = process.env.PORT

// Connect to MongoDB database
mongoose.connect(process.env.MongoSecret, { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json())
		app.use(routes);
		app.listen(PORT, () => {
			console.log("Server has started!")
		})
	})