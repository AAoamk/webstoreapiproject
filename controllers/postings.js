const postingRouter = require('express').Router()
const Posting = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

postingRouter.get("/", async (req, res) => {
	const users = await Posting.find()
	res.send(users)
})

postingRouter.post('/', async (req, res) => {

  const token = getTokenFrom(req)
  if (token == null) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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

  const savedPosting = await posting.save()
  user.postings = user.postings.concat(savedPosting._id)
  await user.save()
  res.json(savedPosting.toJSON())
})

postingRouter.get('/location/:location', async (req, res) => {
  const posting = await Posting.find({location: req.params.location})
  res.send(posting)
})
postingRouter.get('/category/:category', async (req, res) => {
  const posting = await Posting.find({category: req.params.category})
  res.send(posting)
})
postingRouter.get('/date/:date', async (req, res) => {
  const posting = await Posting.find({dateOfPost: {$regex: "[0-9]{4}-[0-9]{2}-[0-9]{2}","$options": "i"} })
  res.send(posting)
})

postingRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const postingToDelete = await Posting.findById(id)
    const token = getTokenFrom(req)
    if (token == null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    if (!postingToDelete) {
      return res.status(400).json({ error: 'no posting found with the id ' + id })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'missing or invalid token' })
    } else if (postingToDelete.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: 'not authorized' })
    } else {
      const deletedPosting = await Posting.findByIdAndRemove(id)
      res.json(deletedPosting.toJSON())
    }

  } catch (exception) {
    return res.status(400).json({ error: 'bad req' })
  }
})

postingRouter.patch('/patch/:id', async (req, res) => {
  const title = req.params.id
  try {
    const postingToModify = await Posting.findById(title)
    const jwToken = fetchToken
  (req)
    if (jwToken == null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const jwtCertified = jwt.verify(jwToken, process.env.TOKEN_KEY)
    if (!postingToModify) {
      return res.status(400).json({ error: 'title doesnt match a posting' + title })
    }
    if (!jwtCertified.title) {
      return res.status(401).json({ error: 'missing or invaltitle jwToken' })
    } else if (postingToModify.user.toString() !== jwtCertified.title) {
      return res.status(401).json({ error: 'authorization failed' })
    } else {
      const update = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        price: req.body.price,
        deliveryType: req.body.deliveryType
      }
      Posting.findOneAndUpdate(title,update)
    }

  } catch (exception) {
    return res.status(400).json({ error: 'req is faulty' })
  }
})

module.exports = postingRouter