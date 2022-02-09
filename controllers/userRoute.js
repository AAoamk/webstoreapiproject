const express = require("express")
const Post = require("../models/postuser") // new
const { response } = require("../routes")
const userRouter = express.Router()

// Get all users
userRouter.get("/", async (req, res) => {
	const users = await Post.find()
	res.send(users)
})
// add user
userRouter.post("/adduser", async (req, res) => {
	try {
		const post = new Post({
			username: req.body.username,
			email: req.body.email,
    	    password: req.body.password,
		})
		await post.save()
		res.send(post)
	} catch (exception) {
		next(exception)
	}

})
// find user by username
userRouter.get("/users/:username", async (req, res) => {
    try {
	const post = await Post.findOne({ username: req.params.username })
	res.send(post)
    } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
}
})

userRouter.patch("/users/:username", async (req, res) => {
	try {
		const post = await Post.findOne({ username: req.params.username })

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
userRouter.delete("/users/:username", async (req, res) => {
	try {
		await Post.deleteOne({ username: req.params.username })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
module.exports = userRouter