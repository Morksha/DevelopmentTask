const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema({
  title: {
    type:String,
    required:"Title is required",
    minlength: 4,
    maxlength:150
  },
  body:{
    type:String,
    required:"Body is required",
    minlength: 4,
    maxlength:2000
  },

  photo:{
    type:Buffer,
    contentType:String
  },

  postedBy:{
    type:ObjectId,
    ref:"User"
  },
  created:{
    type:Date,
    defaukt:Date.now
  }

});

module.exports = mongoose.model("Post",postSchema);
