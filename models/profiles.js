
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    bio: {
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

    

    profileSchema.plugin(passportLocalMongoose) 

var Profiles = mongoose.model('users', profileSchema);

module.exports = Profiles;