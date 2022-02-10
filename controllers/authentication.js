const { request } = require('express')
const jwToken = require('jsonwebtoken')
const User = require('./models/postuser')
const login = express.Router()

login.post("/", async (req, res) => {
    const user = await User.findOne({username: request.body.username})
    const passwordCheck = user === null
	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
    	    password: req.body.password,
		})
		
		await user.save()
		res.send(user)
	} catch (exception) {
		next(exception)
	}

})