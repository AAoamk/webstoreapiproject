const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenGet = require('../middleware/tokenFetch');
//posting a new user
usersRouter.post('/', async (req, res, next) => {
  try {
    //taking the body of the posting
    console.log(req.body)
    //hashing its password so no password gets saved in regular form
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      hashedPassword,
    })
//saving the user
    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})
//get all users without formatting
usersRouter.get('/', async (req, res) => {
  const users = await User.find()
	res.send(users)
})
//deleting user based on id - basically admin delete
usersRouter.delete('/del/:id', async (req, res)=> {
  User
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(doc =>  {
    if (!doc) { return res.status(404).end(); }
    return res.status(204).end();
  })
});
//user based delete that requires auth
usersRouter.delete('/:id', async (request, response) => 
{
  try 
  {
    const id = request.params.id
    const user = await User.findById(id)
    const token = tokenGet.tokenFetch(request)

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