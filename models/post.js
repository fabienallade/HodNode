const Joi = require('joi');
const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  url: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 500
  },
  photo: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
}));

function validatePost(post) {
  const schema = {
    body: Joi.string().min(5).max(50).required(),
    url: Joi.string().min(5).max(50).required(),
    photo: Joi.string().max(500).required(),
    created_at: Joi.date().required(),
  };

  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
