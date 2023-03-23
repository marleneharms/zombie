const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 254,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Remove unnecessary fields from the response
postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Post', postSchema);