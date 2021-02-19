// Import bcryptjs - for password hashing
const bcrypt = require('bcryptjs')

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true
      },
      email: {
        type: String,
        unique: true,
        lovercase: true,
        trim: true,
        required: true
      },
      hash_password: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  )

  schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  schema.method('comparePassword', function(password){
    return bcrypt.compareSync(password, this.hash_password)
  })

  return mongoose.model('user', schema)
}
