const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true, useFindAndModify: false,
  useCreateIndex: true, useUnifiedTopology: true
})


const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  exercises: [{
  		description: String,
  		duration: Number,
  		date: String
  	}
  ]
})

const users = mongoose.model('users', Users)
module.exports = {
  users
}
