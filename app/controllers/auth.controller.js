require('dotenv').config()
// IMports
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = db.user

// Register and Save a new User
exports.register = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  // Create a newUser
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    hash_password: bcrypt.hashSync(req.body.password, 10)
  })

  // Save user in the database
  newUser
    .save(newUser)
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.'
      })
    })
}

// Find a single User with an email
exports.signIn = (req, res) => {
  const email = { email: req.body.email }
  const password = req.body.password

  User.findOne(email, (err, user) => {
    if (err) throw err
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' })
    } else if (user) {
      if (!user.comparePassword(password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' })
      } else {
        const accessToken = generateAccessToken(user.email)
        res.json({
          accessToken: accessToken,
          userData: user
        })
      }
    }
  })
}


exports.me = (req, res) => {
  console.log(req.user)
  const email = req.user.user
  User.findOne(email,(err, user) => {
    if (err) throw err
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' })
    } else if (user) {
      res.json({
        userData: user
      })
    }
  })
}


// Function to generate acces token
const generateAccessToken = (user) => {
  return jwt.sign({ user }, 'Tokenseecret', { expiresIn: '15m' })
}

// User Register function
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    res.json({ message: 'Authorized User, Action Successful!' })
  } else {
    res.status(401).json({ message: 'Unauthorized user!' })
  }
}

// Token Verification
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'Tokenseecret', (err, user) => {
    console.log(err)
    if (err) return res.status(403).json({ message: 'Wrong token' })
    req.user = user
    next()
  })
}
