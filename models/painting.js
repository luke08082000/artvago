const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paint: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Painting', paintingSchema);