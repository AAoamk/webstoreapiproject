const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
// Connect to MongoDB database
mongoose.connect("mongodb+srv://Snutri:tCbJtoBWdEHCOEjS@websitecluster.t4wds.mongodb.net/websitecluster?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json())
        app.use("/api", routes) // new

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})