const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const HomeSchema = new mongoose.Schema({// bir ara rating eklenmeli ama baska bir model olarak, ama home a mi konur yoksa travelera mi bilemedim
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traveler',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
    }]
})

HomeSchema.plugin(autopopulate)

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel