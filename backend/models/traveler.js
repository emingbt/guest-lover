const mongoose = require('mongoose')

const TravelerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    requestActive: {
        type: Array,
        default: []
    },
    requestPast: {
        type: Array,
        default: []
    },
    home: {
        type: String
    }
})

const TravelerModel = mongoose.model('Traveler', TravelerSchema)

module.exports = TravelerModel