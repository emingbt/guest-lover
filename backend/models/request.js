const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const RequestSchema = new mongoose.Schema({
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Traveler',
      autopopulate: {
        maxDepth: 1
      }
    },
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
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
    }
})

RequestSchema.plugin(autopopulate)

const RequestModel = mongoose.model('Request', RequestSchema)

module.exports = RequestModel