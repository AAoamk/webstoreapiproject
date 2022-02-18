const app = require('./routes')
const http = require('http')
const mongoose = require('mongoose')
const server = http.createServer(app)
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})