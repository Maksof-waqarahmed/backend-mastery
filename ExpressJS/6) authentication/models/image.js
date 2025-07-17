const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    publicID: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Image', imageSchema)