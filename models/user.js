const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users')

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    Phone:Number,
     notifications: {
    type: [String],
  },
   user_id:mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('user',userSchema);