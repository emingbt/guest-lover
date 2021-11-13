const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const HomeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traveler',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    guests: Array
})

HomeSchema.plugin(autopopulate)

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel