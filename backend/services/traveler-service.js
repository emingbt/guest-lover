const BaseService = require('./base-service')
const TravelerModel = require('../models/traveler')
const HomeService = require('./home-service')
const RequestModel = require('../models/request')

class TravelerService extends BaseService {
    model = TravelerModel

    async addHome(traveler, travelerHome) {
        traveler.home = travelerHome
        await traveler.save()
    }

    async deleteHome(traveler) {
        await HomeService.del(traveler.home)
        traveler.home = undefined
        await traveler.save()
    }

    async askHost(traveler, home, owner) {
        const request = await RequestModel.create({requester: traveler, home: home, status: 'pending'})
        console.log('test', traveler.bookRequest)
        traveler.bookRequest.push(request)
        owner.bookRequest.push(request)

        await traveler.save()
        await owner.save()
    }

    async replyTraveler(host, bookRequest, response) {
        if (response == 'accept') {
            host.home.guests.push(bookRequest.requester)
            bookRequest.status = 'current'

            await bookRequest.save()
            await host.home.save()
        }
        else {
            bookRequest.status = 'cancelled'
            await bookRequest.save()
        }
    }
}

module.exports = new TravelerService()