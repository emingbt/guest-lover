const express = require('express')
const router = express.Router()

const TravelerService = require('../services/traveler-service')
const HomeService = require('../services/home-service')
const BookingService = require('../services/booking-service')
const TravelerModel = require('../models/traveler')
const HomeModel = require('../models/home')

router.get('/all', async (req, res) => { // all kalkicak
    const travelers = await TravelerService.findAll()
    res.render('list', {items: travelers})
})

router.get('/all/json', async (req, res) => {
    const travelers = await TravelerService.findAll()
    res.send(travelers)
})

router.get('/:id', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    if (!traveler) res.status(404)
    res.render('data', {data: traveler})
})

router.get('/:id/json', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    if (!traveler) res.status(404)
    res.send(traveler)
})

router.post('/', async (req, res) => {
    const traveler = await TravelerService.insert(req.body)
    res.send(traveler)
})

router.delete('/:id', async (req, res) => {
    await TravelerService.remove(req.params.id)
    res.send('OK')
})

router.delete('/all/:name', async (req, res) => { // for the tests
    await TravelerService.removeBy('name', req.params.name)
    res.send("OK")
})

router.post('/:id/home/add/', async (req, res) => { // add i kaldir
    const home = await HomeService.addHome(req.params.id, req.body.location)
    res.send({home})
})

router.delete('/:id/home', async (req, res) => {
    await HomeService.deleteHome(req.params.id)
    res.send('OK')
})

router.get('/:id/home/all', async (req, res) => {
    const homes = await HomeService.findAll()
})

router.post('/:id/home/:homeId', async (req, res) => {
    const travelerId = req.params.id
    const homeId = req.params.homeId

    const booking = await BookingService.askHost(travelerId, homeId)

    res.send(booking)
})

router.patch('/:id/replyBooking/:bookingId/:response', async (req, res) => {
    const ownerId = req.params.id
    const bookingId = req.params.bookingId
    const response = req.params.response

    const booking = await BookingService.replyTraveler(ownerId, bookingId, response)

    res.send(booking)
})

router.patch('/:id/finishBooking/:bookingId', async (req, res) => {
    const ownerId = req.params.id
    const bookingId = req.params.bookingId
    const rating = req.body

    const booking = await BookingService.finishBook(ownerId, bookingId, rating)

    res.send(booking)
})

module.exports = router