const VisitModel = require('../models/visit')
const BaseService = require('./base-service')
const TravelerService = require('./traveler-service')
const HomeService = require('./home-service')

class VisitService extends BaseService {
  async askHost(travelerId, homeId) {
    const traveler = await TravelerService.find(travelerId)
    const home = await HomeService.find(homeId)
    const owner = await TravelerService.find(home.owner._id)

    const visit = await this.insert({requester: traveler, home: home, status: 'pending'})

    traveler.visits.push(visit.toObject())
    owner.visits.push(visit.toObject())

    await traveler.save()
    await owner.save()

    return visit
  }

  async replyTraveler(ownerId, visitId, response) {
    const owner = await TravelerService.find(ownerId)
    const visit = await this.find(visitId)

    if(response == 'accept') {
      visit.status = 'current'
    }
    else {
      visit.status = 'cancelled'
    }

    await visit.save()

    return visit
  }

  async finishBook(ownerId, visitId, ratingBody) {
    const owner = await TravelerService.find(ownerId)
    const visit = await this.find(visitId)

    visit.status = 'past'
    visit.rating = (ratingBody)

    await visit.save()

    return visit
  }
}

module.exports = new VisitService(VisitModel)