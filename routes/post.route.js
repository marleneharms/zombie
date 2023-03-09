const postController = require('../controllers/post.controller');

const express = require('express');
const router = express.Router();


router.get('/', postController.getAllPosts);
router.post("/", postController.createPost);
router.get('/:id', postController.getPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
