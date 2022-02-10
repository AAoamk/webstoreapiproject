const express = require("express")
const lists = require("../models/postlist") // new
//const { response } = require("../routes")
const listingRouter = express.Router()

// Get all lists
listingRouter.get("/", async (req, res) => {
	const users = await lists.find()
	res.send(users)
})
// add user
listingRouter.post("/post", async (req, res) => {
	try {
		const post = new lists({
            title: req.body.title,
            category: req.body.category,
            location: req.body.location,
            price: req.body.price,
            dateOfPost: req.body.dateOfPost,
            deliveryType: req.body.deliveryType,
            userReference: req.body.userReference
		})
		await post.save()
		res.send(post)
	} catch (exception) {
		next(exception)
	}

})
// find user by username
listingRouter.get("/get/:username", async (req, res) => {
    try {
	const post = await lists.findOne({ username: req.params.username })
	res.send(post)
    } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
}
})

listingRouter.patch("/patch/:username", async (req, res) => {
	try {
		const post = await lists.findOne({ username: req.params.username })

		if (req.body.email) {
			post.email = req.body.email
		}

		if (req.body.password) {
			post.password = req.body.password
		}


		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
listingRouter.delete("/del/:username", async (req, res) => {
	try {
		await lists.deleteOne({ username: req.params.username })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
module.exports = listingRouter