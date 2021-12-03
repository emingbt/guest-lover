const express = require('express')
const router = express.Router()

const TravelerService = require('../services/traveler-service')
const HomeService = require('../services/home-service')
const VisitService = require('../services/visit-service')
const TravelerModel = require('../models/traveler')
const HomeModel = require('../models/home')

router.get('/', async (req, res) => {
    const travelers = await TravelerService.findAll()
    res.render('list', {items: travelers})
})

router.get('/json', async (req, res) => {
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

router.post('/:id/home/', async (req, res) => {
    const home = await HomeService.addHome(req.params.id, req.body.location)
    res.send({home})
})

router.delete('/:id/home', async (req, res) => {
    await HomeService.deleteHome(req.params.id)
    res.send('OK')
})

router.post('/:id/visit/:homeId', async (req, res) => {
    const travelerId = req.params.id
    const homeId = req.params.homeId

    const visit = await VisitService.askHost(travelerId, homeId)

    res.send(visit)
})

router.patch('/:id/visit/:visitId/:response', async (req, res) => {
    const ownerId = req.params.id
    const visitId = req.params.visitId
    const response = req.params.response

    const visit = await VisitService.replyTraveler(ownerId, visitId, response)

    res.send(visit)
})

router.patch('/:id/visit/:visitId', async (req, res) => {
    const ownerId = req.params.id
    const visitId = req.params.visitId
    const rating = req.body

    const visit = await VisitService.finishBook(ownerId, visitId, rating)

    res.send(visit)
})

module.exports = router