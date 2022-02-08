const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001
console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect("mongodb+srv://websitecluster.t4wds.mongodb.net/websitecluster")
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.listen(port,()=>console.log('hello world app listening'))
app.use(cors())
app.use(express.json())

module.exports = app