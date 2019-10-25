
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    });

module.exports =  mongoose.model('experienceSchema', experienceSchema);