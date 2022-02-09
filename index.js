const express = require("express")
const http = require('http')
const mongoose = require("mongoose")
const routes = require("./routes")
const PORT = process.env.PORT || 2000

// Connect to MongoDB database
mongoose.connect("mongodb+srv://Snutri:tCbJtoBWdEHCOEjS@websitecluster.t4wds.mongodb.net/websitecluster?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json())
		app.use(routes);
		app.listen(PORT, () => {
			console.log("Server has started!")
		})
	})