const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const HomeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traveler',
        autopopulate: {
            maxDepth: 1
        }
    },
    location: String,
    guests: Array
})

HomeSchema.plugin(autopopulate)

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel