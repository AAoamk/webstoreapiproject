const express = require("express")
const Post = require("./models/postuser") // new
const router = express.Router()

// Get all users
router.get("/users", async (req, res) => {
	const users = await Post.find()
	res.send(users)
})
router.post("/adduser", async (req, res) => {
	const post = new Post({
		username: req.body.username,
		email: req.body.email,
        password: req.body.password,
	})
	await post.save()
	res.send(post)
})

module.exports = router