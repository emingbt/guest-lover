const express = require('express')
const router = express.Router()

const TravelerService = require('../services/traveler-service')
const HomeService = require('../services/home-service')

const BookingModel = require('../models/booking')

router.get('/all', async (req, res) => {
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
    const traveler = await TravelerService.add(req.body)
    res.send(traveler)
})

router.delete('/:id', async (req, res) => {
    await TravelerService.del(req.params.id)
    res.send('OK')
})

router.delete('/all/:name', async (req, res) => {
    await TravelerService.delMany(req.params.name)
    res.send("OK")
})

router.post('/:id/home/add/', async (req, res) => {
    const home = await TravelerService.addHome(req.params.id, req.body.location)

    res.send(home)
})

router.delete('/:id/home', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)

    await TravelerService.deleteHome(traveler)

    res.send('OK')
})

router.post('/:id/home/:homeId', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    const home = await HomeService.find(req.params.homeId)
    const owner = await TravelerService.find(home.owner)

    const booking = await TravelerService.askHost(traveler, home, owner)

    res.send(booking)
})

router.patch('/:id/requests/:requestId/:response', async (req, res) => {
    // post ->> patch
    const host = await TravelerService.find(req.params.id)
    const bookRequest = await RequestModel.findById(req.params.requestId)
    const response = req.params.response

    const booking = await TravelerService.replyTraveler(host, bookRequest, response)

    res.send(booking)
})

module.exports = router