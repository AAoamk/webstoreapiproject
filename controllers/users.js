const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

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

module.exports = usersRouter