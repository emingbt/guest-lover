const BaseService = require('./base-service')
const TravelerModel = require('../models/traveler')
const HomeService = require('./home-service')

class TravelerService extends BaseService {
    model = TravelerModel

    async addHome(traveler, home) {
        traveler.home = home
        await traveler.save()
    }

    async deleteHome(traveler) {
        await HomeService.del(traveler.home)
        traveler.home = undefined
        await traveler.save()
    }

    async sendRequest(traveler, home, owner) {
        traveler.requestActive.push(home._id)
        owner.requestActive.push(traveler._id)
        await traveler.save()
        await owner.save()
    }

    async replyRequest(traveler, request, requirer, home, response) {
        if(response == 'accept') {
            home.guests.push(request)
            traveler.home.guests.push(request)

            requirer.requestPast.push([traveler._id, 'accepted'])
            traveler.requestPast.push([request, 'accepted'])

            traveler.requestActive.splice(traveler.requestActive.indexOf(request), 1)
            requirer.requestActive.splice(requirer.requestActive.indexOf(traveler._id, 1))
        }
        else {
            requirer.requestPast.push([traveler._id, 'rejected'])
            traveler.requestPast.push([request, 'rejected'])

            traveler.requestActive.splice(traveler.requestActive.indexOf(request), 1)
            requirer.requestActive.splice(requirer.requestActive.indexOf(traveler._id, 1))
        }

        await traveler.save()
        await requirer.save()
        await home.save()
    }
}

module.exports = new TravelerService()