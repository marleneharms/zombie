const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Point', pointSchema);