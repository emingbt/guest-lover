const express = require('express')

require("dotenv").config();

const travelerRouter = require('./routes/traveler')
const homeRouter = require('./routes/home')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(express.json())

app.use('/traveler', travelerRouter) //travelers olacak
app.use('/home', homeRouter)

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app