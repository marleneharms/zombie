const mongoose = require('mongoose');
const postModel = require('./post.schema');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 254,
    },
    hash_password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 254,
    },
    posts: [postModel.schema],
    created: {
        type: Date,
        default: Date.now,
    },
});

// Remove unnecessary fields from the response
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        // Remove password from the response
        delete returnedObject.password;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('User', userSchema);