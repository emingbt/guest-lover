const express = require('express')
const router = express.Router()

const TravelerService = require('../services/traveler-service')
const HomeService = require('../services/home-service')

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
    const traveler = await TravelerService.del(req.params.id)
    res.send(traveler)
})

router.delete('/all/:name', async (req, res) => {
    const travelers = await TravelerService.delMany(req.params.name)
    res.send(travelers)
})

router.post('/:id/home/add/', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    const homeToCreate = {owner: traveler, location: req.body.location}
    const home = await HomeService.add(homeToCreate)
    home.owner = homeToCreate
    await TravelerService.addHome(traveler, home)
    res.send(traveler)
})

router.delete('/:id/home', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    await TravelerService.deleteHome(traveler)
    res.send(traveler)
})

router.post('/:id/home/:homeId', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    const home = await HomeService.find(req.params.homeId)
    const owner = await TravelerService.find(home.owner)

    await TravelerService.sendRequest(traveler, home, owner)

    res.send(traveler)
})

router.post('/:id/requests/:requestId/:response', async (req, res) => {
    const traveler = await TravelerService.find(req.params.id)
    const request = traveler.requestActive[req.params.requestId]
    const requirer = await TravelerService.find(request)
    const home = await HomeService.find(traveler.home._id)
    const response = req.params.response

    await TravelerService.replyRequest(traveler, request, requirer, home, response)
    res.send(traveler)
})

module.exports = router