const Post = require("../models/post.schema");
const mongoose = require("mongoose");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts && posts.length === 0) {
            res.status(404).json({ message: "No posts found" });
        } else {
            res.status(200).json(posts);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPost = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "Id is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Id is not valid" });
    } else {
        try {
            const post = await Post.findById(id);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.createPost = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).json({ message: "Title and content are required" });
    } else if (req.body.title.length < 5 || req.body.content.length < 5) {
        res.status(400).json({
            message: "Title and content must be at least 5 characters long",
        });
    } else if (req.body.title.length > 50 || req.body.content.length > 240) {
        res.status(400).json({
            message:
                "Title must be less than 50 and content 240 characters long",
        });
    } else {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
        });
        try {
            const newPost = await post.save();
            res.status(201).json({ message: "Post created", post: newPost });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
};

exports.updatePost = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "Id is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Id is not valid" });
    } else if (!req.body.title && !req.body.content) {
        res.status(400).json({ message: "Title or content are required" });
    } else {
        try {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    title: req.body.title,
                    content: req.body.content,
                },
                { new: true }
            );
            if (post) {
                res.status(200).json({ message: "Post updated", post });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.deletePost = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "Id is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Id is not valid" });
    } else {
        try {
            const post = await Post.findByIdAndDelete(id);
            if (post) {
                res.status(200).json({ message: "Post deleted" });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
