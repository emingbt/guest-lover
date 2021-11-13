const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const BookingSchema = new mongoose.Schema({
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Traveler',
      required: true
    },
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true
    },
    status: {
      type: String,
      enum: [
        'pending',
        'current',
        'past',
        'cancelled'
      ],
      required: true
    }
})

BookingSchema.plugin(autopopulate)

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel