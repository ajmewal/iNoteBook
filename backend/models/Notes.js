const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true,
  },
  tag:{
    type: String,
    default: 'General'
  },
  date:{
    type: Date,
    default: Date.now
  }
  
});

const Notes = mongoose.model('notes',userSchema)

module.exports = Notes