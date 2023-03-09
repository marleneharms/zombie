const Post = require('../models/post.schema');


exports.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// TODO: Implement the rest of the CRUD operations

// Get a single post by id, using the id from the request parameters
exports.getPost = async (req, res) => {
}

// Create a single post validating the request body
exports.createPost = async (req, res) => {
    res.status(201).json({message: "Post created"});
}

// Update a single post by id, and update the post with the data from the request body
exports.updatePost = async (req, res) => {
}

// Delete a single post by id
exports.deletePost = async (req, res) => {
}