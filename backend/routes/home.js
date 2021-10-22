const express = require('express')
const router = express.Router()

const HomeService = require('../services/home-service')

router.get('/all', async (req, res) => {
    const homes = await HomeService.findAll()
    res.render('list', {items: homes})
})

router.get('/:id', async (req, res) => {
  const home = await HomeService.find(req.params.id)
  res.render('data', { data: home })
})

router.post('/', async (req, res) => {
  const home = await HomeService.add(req.body)
  res.send(home)
})

router.delete('/:id', async (req, res) => {
  const home = await HomeService.del(req.params.id)
  res.send(home)
})

module.exports = router