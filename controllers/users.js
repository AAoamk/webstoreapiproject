const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
usersRouter.post('/', async (req, res, next) => {
  try {
    
    const saltRounds = 10
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const user = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      hashedPassword,
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find()
	res.send(users)
})

usersRouter.delete('/del/:id', async (req, res)=> {
  User
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(doc =>  {
    if (!doc) { return res.status(404).end(); }
    return res.status(204).end();
  })
});

usersRouter.delete('/:id', async (request, response) => 
{
  try 
  {
    const id = request.params.id
    const user = await User.findById(id)
    const token = getTokenFrom(request)

    if (token == null)
      return response.status(401).json({ error: 'Token missing or invalid' })

    if (!user)
      return response.status(400).json({ error: "No users found with the id: "})

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    if (!decodedToken.id)
      return response.status(401).json({ error: 'Missing or invalid token' })

    const deletedUser = await User.findByIdAndRemove(id)
    response.json(deletedUser.toJSON())
  } 
  catch (exception) 
  {
    return response.status(400).json({ error: 'Bad request' })
  }
})

module.exports = usersRouter