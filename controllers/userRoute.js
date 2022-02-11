const express = require("express")
const bcrypt = require('bcrypt')
const User = require("../models/postuser") // new
//const { response } = require("../routes")
const userRouter = express.Router()

// Get all users
userRouter.get("/", async (req, res) => {
	const users = await User.find()
	res.send(users)
})
// add user
userRouter.post("/adduser", async (req, res) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 5)
		const user = new User({
		username: req.body.username,
		email: req.body.email,
    	hash,
		})
		await user.save()
		res.send(user)
	} catch (exception){
		next(exception)
	}
})
// find user by username
userRouter.get("/users/:username", async (req, res) => {
    try {
	const user = await User.findOne({ username: req.params.username })
	res.send(user)
    } catch {
    res.status(404)
    res.send({ error:  "User doesn't exist!" })
}
})

userRouter.patch("/patch/:username", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username })
		if (req.body.email) {
			user.email = req.body.email
		}

		if (req.body.password) {
			const hash = await bcrypt.hash(req.body.password, 5)
			user.password = hash
		}


		await user.save()
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error:  "User doesn't exist!" })
	}
})
userRouter.delete("/del/:username", async (req, res) => {
	try {
		await User.deleteOne({ username: req.params.username })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error:  "User doesn't exist!" })
	}
})
module.exports = userRouter