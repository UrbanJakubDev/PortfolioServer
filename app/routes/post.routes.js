module.exports = (app) => {
  const blogposts = require('../controllers/post.controller.js')
  const auth = require('../controllers/auth.controller')

  var router = require('express').Router()

  // Create a new Tutorial
  router.post('/', auth.authenticateToken, blogposts.create)

  // Retrieve all Tutorials
  router.get('/', blogposts.findAll)

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get('/:id', blogposts.findOne)

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete('/:id', auth.authenticateToken, blogposts.delete)

  // // Create a new Tutorial
  // router.delete("/", tutorials.deleteAll);

  app.use('/api/posts', router)
}
