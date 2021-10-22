const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    owner: String,
    location: String,
    guests: Array
})

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel