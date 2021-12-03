const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const VisitSchema = new mongoose.Schema({
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
        required: true // hoaydaaa
      },
      message: {
        type: String
      }
    }
})

VisitSchema.plugin(autopopulate)

const VisitModel = mongoose.model('Visit', VisitSchema)

module.exports = VisitModel