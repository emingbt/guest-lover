const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const RatingSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  message: {
    type: String
  }
})

RatingSchema.plugin(autopopulate)

const RatingModel = mongoose.model('Rating', RatingSchema)

module.exports = RatingModel