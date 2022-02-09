const express = require("express")
const Post = require("./models/postuser") // new
const router = express.Router()

// Get all users
router.get("/users", async (req, res) => {
	const users = await Post.find()
	res.send(users)
})
// add user
router.post("/adduser", async (req, res) => {
	const post = new Post({
		username: req.body.username,
		email: req.body.email,
        password: req.body.password,
	})
	await post.save()
	res.send(post)
})
// find user by username
router.get("/users/:username", async (req, res) => {
    try {
	const post = await Post.findOne({ _id: req.params.id })
	res.send(post)
    } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
}
})

router.patch("/users/:username", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.email) {
			post.title = req.body.title
		}

		if (req.body.password) {
			post.content = req.body.content
		}


		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
module.exports = router