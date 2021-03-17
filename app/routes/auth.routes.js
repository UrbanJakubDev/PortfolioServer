module.exports = (app) => {
  const users = require('../controllers/auth.controller.js')
  const auth = require('../controllers/auth.controller')

  var router = require('express').Router()

  // Register a new User
  router.post('/auth/register', users.register)

  //Login user
  router.post('/auth/login', users.signIn)

  router.get('/auth/user', users.me)

  // Retrieve all Tutorials
  //router.get("/", users.findAll);

  app.use('/api', router)
}
