const postingRouter = require('express').Router()
const Posting = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenGet = require('../middleware/tokenFetch');
//get ALL postings without any special formatting or such
postingRouter.get("/", async (req, res) => {
	const users = await Posting.find()
	res.send(users)
})
//posting a new posting, giving a json format body of information to go alongside it
postingRouter.post('/', async (req, res) => {
  //the code to check for the jwt token generated at login
  try {
  const token = tokenGet.tokenFetch(req)
  if (token == null) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  //if tests are passed, search for the user by the tokens id to give relative information to the body
  const user = await User.findById(decodedToken.id)
  //taking the body information and passing it as a new posting
  const posting = new Posting({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    price: req.body.price,
    dateOfPost: req.body.dateOfPost,
    deliveryType: req.body.deliveryType,
    userReference: user.id
})
//saving the generated posting, with the user data, then sending it back as a json
  const savedPosting = await posting.save()
  user.postings = user.postings.concat(savedPosting._id)
  await user.save()
  res.json(savedPosting.toJSON())
} catch (exception) {
  return res.status(400).json({ error: 'duplicate' })
}
})
//the three different search types based on location/category/date with some nice regex on the date
postingRouter.get('/location/:location', async (req, res) => {
  const posting = await Posting.find({location: req.params.location}).populate('userReference', ['fullname', 'phonenumber', 'email'])
  res.send(posting)
})
postingRouter.get('/category/:category', async (req, res) => {
  const posting = await Posting.find({category: req.params.category}).populate('userReference', ['fullname', 'phonenumber', 'email'])
  res.send(posting)
})
postingRouter.get('/date/:date', async (req, res) => {
  const posting = await Posting.find({dateOfPost: {$regex: "[0-9]{4}-[0-9]{2}-[0-9]{2}","$options": "i"} }).populate('userReference', ['fullname', 'phonenumber', 'email'])
  res.send(posting)
})
//deleting a posting based on id, while checking for authentication
postingRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const postingToDelete = await Posting.findById(id)
    const token = tokenGet.tokenFetch(req)
    //console.log("token received")
    if (token == null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    if (!postingToDelete) {
      return res.status(400).json({ error: 'no posting found with the id ' + id })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'missing or invalid token' })
    } else {
      //console.log("starting to run find posting")
      const deletedPosting = await Posting.findByIdAndRemove(id)
      //console.log("posting found and removed")
      res.json(deletedPosting.toJSON())
    }
  } catch (exception) {
    return res.status(400).json({ error: 'bad req' })
  }

})
/*
postingRouter.patch('/patch/:id', async (req, res) => {
  const id = req.params.id
  try {
    const postingToModify = await Posting.findById(id)
    const token = tokenGet.tokenFetch(req)
    if (token == null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    if (!postingToModify) {
      return res.status(400).json({ error: 'title doesnt match a posting' + id })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'missing or invalid token' })
    } else {
      const update = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        price: req.body.price,
        deliveryType: req.body.deliveryType
      }
    const temp = await Posting.findOneAndUpdate(id,update)
    res.json(temp.toJSON())
    }

  } catch (exception) {
    return res.status(400).json({ error: 'req is faulty' })
  }
  
})
*/

module.exports = postingRouter