const express = require('express')
const app = express()
const cors = require('cors')
const postingRouter = require('./controllers/postings')
const usersRouter = require('./controllers/users')
const authentication = require('./middleware/auth')

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/postings', postingRouter)
app.use('/api/login', authentication)

module.exports = app