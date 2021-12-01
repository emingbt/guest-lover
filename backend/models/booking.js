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
      required: true,
      autopopulate: {
        maxDepth: 1
      }
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
    },
    rating: {
      type: Object,
      stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      message: {
        type: String
      }
    }
})

BookingSchema.plugin(autopopulate)

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel