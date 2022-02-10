const express = require("express")
const rootRouter = express.Router()
const cors = require('cors')
const userRouter = require('./controllers/userRoute')
const listingRouter = require('./controllers/listingRoute')


rootRouter.use('/api/user', userRouter)
rootRouter.use('/api/list', listingRouter)
module.exports = rootRouter