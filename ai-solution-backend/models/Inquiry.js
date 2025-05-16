const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    company: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    jobTitle: {
        type: String
    },
    jobDescription: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', InquirySchema);