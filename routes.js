const express = require("express")
const rootRouter = express.Router()
const cors = require('cors')
const userRouter = require('./controllers/userRoute')
const listingRouter = require('./controllers/listingRoute')
const login = require('./controllers/authentication')


rootRouter.use('/api/user', userRouter)
rootRouter.use('/api/list', listingRouter)
rootRouter.use('/api/login', login)
module.exports = rootRouter