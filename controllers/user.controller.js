const User = require("../models/user.schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    try {
        const user = await newUser.save();
        res.status(201).json({ message: "User created", user: user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
    

exports.sign_in = async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        
        const isMatch = bcrypt.compareSync(password, user.hash_password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ username: user.username, email: user.email, posts: user.posts, id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({ token: token });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
