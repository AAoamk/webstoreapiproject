/*const express = require("express")
const bcrypt = require('bcrypt')
const jwToken = require('jsonwebtoken')
const User = require('../models/postuser')
const login = express.Router()

login.post("/", async (req, res) => {
    const user = await User.findOne({username: request.body.username})
	const credentials = user && (await bcrypt.compare(body.password, user.passwordHash));
	if(!(credentials)) {
		return response.status(401).json({
		error: 'invalid username or password'
		})
	}
	const token = jwt.sign(token, )

	
})

module.exports = auth */