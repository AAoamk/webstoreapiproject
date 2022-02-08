const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001
const usersRoute = require('./controllers/user.controller')
console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect("mongodb+srv://websitecluster.t4wds.mongodb.net/websitecluster")

app.use(cors())
app.use(express.json())
app.use('/users.controller', usersRoute)

module.exports = app