require('dotenv/config')
var fs = require('fs')
var path = require('path')
var multer = require('multer')
var cloudinary = require('cloudinary').v2

const db = require("../models");
const Attachment = db.attachments;


module.exports = (app) => {

  
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  })

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    },
  })

  var upload = multer({ storage: storage })
  var imgModel = require('../models/attachments.model')

  var router = require('express').Router()

//   // GET image
//   router.get('/', (req, res) => {
//     imgModel.find({}, (err, items) => {
//       if (err) {
//         console.log(err)
//       } else {
//         res.json({ items: items })
//       }
//     })
//   })

  // Post image
  router.post('/upload', upload.single('file'), (req, res, next) => {
    const data = {
      image: req.file.path,
    }
    cloudinary.uploader
      .upload(data.image)
      .then((result) => {

        const attachment = new Attachment({
          img: result.secure_url,
        })
        console.log(attachment);

        const response = attachment.save()
        res.status(200).send({
          message: 'success',
          result,

        })
      })
      .catch((error) => {
        res.status(500).send({
          message: 'failure',
          error,
        })
      })
  })

  app.use('/api/attachments', router)
}
