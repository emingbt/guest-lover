const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const TravelerSchema = new mongoose.Schema({ //traveler degil de user denilebilir
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
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        autopopulate: {
            maxDepth: 1
        }
    }],
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
        autopopulate: {
            maxDepth: 1
        }
    }
})

TravelerSchema.plugin(autopopulate)

const TravelerModel = mongoose.model('Traveler', TravelerSchema)

module.exports = TravelerModel