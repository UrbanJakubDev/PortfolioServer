module.exports = (app) => {

  /** Express router providing user related routes
   */
  const users = require('../controllers/auth.controller.js')

  /**
   * express module
   */
  var router = require('express').Router()

  /**
   * Route registering user.
   */
  router.post('/auth/register', users.register)

  /**
   * Route Login User.
   */
  router.post('/auth/login', users.signIn)

  /**
   * Route serve User Information after Login.
   */
  router.get('/auth/user', users.authenticateToken, users.me)

  app.use('/api', router)
}
