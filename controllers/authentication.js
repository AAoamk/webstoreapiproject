const express = require("express")
const bcrypt = require('bcrypt')
const jwToken = require('jsonwebtoken')
const User = require('../models/postuser')
const auths = express.Router()

auths.post("/", async (req, res) => {
    const user = await User.findOne({username: request.body.username})
	if(user == null) {
		res.status(404)
		res.send({ error:  "User doesn't exist!" })
	}
	else {
		const passCheck = await bcrypt.compare(request.body.password, user.hash)
		const credentials = user && passCheck
		const token = jwt.sign(credentials, process.env.JWTsecret)
		res.send({ token, username: request.body.username })
	}
	/*
	if(!(credentials)) {
		return response.status(401).json({
		error: 'invalid username or password'
		})
	}
	const token = jwt.sign(credentials, process.env.JWTsecret)
	
    res.send({ token, username: request.body.username })
	*/
})

module.exports = auths