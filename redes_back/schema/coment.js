const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  // User:{
  //   id: mongoose .Schema.Types.ObjectId,
  //   ref:'User',
  //   required: true,
  // }
  
});

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
});



const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
