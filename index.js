//init the requirements to have the app work, including the server, mongoose link to mongo and dotenv for local variables
const app = require('./routes')
const http = require('http')
const mongoose = require('mongoose')
const server = http.createServer(app)
require('dotenv').config()
//connecting to mongoose via the the local variable URI 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
//determining the listening port of the server
const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})