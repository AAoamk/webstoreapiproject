const express = require("express")
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/userRoute')


app.use('/api/user', userRouter)

module.exports = app