const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const port = 3000;
console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port,()=>console.log('hello world app listening'))