const {
  Posts, validate
} = require('../models/post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
  const posts = await Posts.find();
  res.send(posts);
});

router.post('/', async(req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post({
    body: req.body.body,
    url: req.body.url,
    photo: req.body.photo
  });
  post = await post.save();

  res.send(post);
});

router.put('/:id', async(req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, {
    body: req.body.body,
    url: req.body.url,
    photo: req.body.photo,
    updated_at: req.body.updated_at
  }, {
    new: true
  });

  if (!post) return res.status(404).send(
    'The post with the given ID was not found.');

  res.send(customer);
});

// router.delete('/:id', async(req, res) => {
//   const customer = await Customer.findByIdAndRemove(req.params.id);
//
//   if (!customer) return res.status(404).send(
//     'The customer with the given ID was not found.');
//
//   res.send(customer);
// });
//
// router.get('/:id', async(req, res) => {
//   const customer = await Customer.findById(req.params.id);
//
//   if (!customer) return res.status(404).send(
//     'The customer with the given ID was not found.');
//
//   res.send(customer);
// });

module.exports = router;
