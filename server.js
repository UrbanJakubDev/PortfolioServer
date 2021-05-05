'use strict'
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cloudinary = require('cloudinary').v2;

const app = express()

// CORS Policy options
var corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// Database config
const db = require('./app/models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})

require('./app/routes/turorial.routes')(app)
require('./app/routes/auth.routes')(app)
require('./app/routes/post.routes')(app)
require('./app/routes/attachment.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
