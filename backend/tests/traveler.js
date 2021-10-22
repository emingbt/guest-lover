const test = require('ava')
const request = require('supertest')
const app = require('../app')

test('Create new traveler', async t => {
  t.plan(3)
  const travelerToCreate = {
    name: 'Garavel Usta',
    age: 21
  }

  const res = await request(app)
    .post('/traveler')
    .send(travelerToCreate)

  t.is(res.status, 200)

  t.is(res.body.name, travelerToCreate.name)
  t.is(res.body.age, travelerToCreate.age)
})

test('Fetch a traveler', async t => {
  t.plan(3)
  const travelerToCreate = {
    name: 'Garavel Usta',
    age: 21
  }

  const travelerCreated = (await request(app)
    .post('/traveler')
    .send(travelerToCreate)).body

  const fetchRes = await request(app).get(`/traveler/${travelerCreated._id}`)
  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/traveler/${travelerCreated._id}/json`)
  t.is(fetchResJson.status, 200)

  const travelerFetched = fetchResJson.body
  t.deepEqual(travelerCreated, travelerFetched)
})

test('Delete a traveler', async t => {
  t.plan(3)
  const travelerToCreate = {
    name: 'Garavel Usta',
    age: 21
  }

  const travelerCreated = (await request(app)
    .post('/traveler')
    .send(travelerToCreate)).body

  const deleteRes = await request(app).delete(`/traveler/${travelerCreated._id}`)
  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  const fetch = await request(app).get(`/traveler/${travelerCreated._id}/json`)
  t.is(fetch.status, 404)
})

test('Get list of travelers', async t => {
  const travelerToCreate = {
    name: 'Garavel Usta',
    age: 21
  }

  const createRes = await request(app)
    .post('/traveler')
    .send(travelerToCreate)

  const res = await request(app).get('/traveler/all')
  t.is(res.status, 200)

  const jsonRes = await request(app).get('/traveler/all/json')
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length > 0)
})

test('Add a new home to traveler', async t => {
  const travelerToCreate = {
    name: 'Garavel Usta',
    age: 21
  }

  const travelerCreated = (await request(app)
    .post('/traveler')
    .send(travelerToCreate)).body

  const homeToAdd = {
    owner: travelerCreated._id,
    location: 'Ankara'
  }
  
  const addHomeRes = await request(app).post(`/traveler/${travelerCreated._id}/home/add/`).send(homeToAdd)
  t.is(addHomeRes.status, 200)
  
  const travelerAddedHome = (await request(app).get(`/traveler/${travelerCreated._id}/json`)).body
  t.is(travelerAddedHome.home, homeToAdd.owner)
})