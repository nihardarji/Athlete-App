const mongoose = require('mongoose')

const AthleteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profileImage:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    team: {
        type: String
    },
    gender: {
        type: String
    },
    about: {
        type: String
    },
    interests: {
        type: String
    },
    sports: [{
        id: {
            type: Number
        },
        name: {
            type: String
        }
    }],
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('athletes', AthleteSchema)