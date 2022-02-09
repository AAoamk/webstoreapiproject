const express = require("express")
const rootRouter = express.Router()
const cors = require('cors')
const userRouter = require('./controllers/userRoute')


rootRouter.use('/api/user', userRouter)

module.exports = rootRouter