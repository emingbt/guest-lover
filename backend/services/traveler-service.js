const BaseService = require('./base-service')
const TravelerModel = require('../models/traveler')
const HomeService = require('./home-service')
const BookingModel = require('../models/booking')

class TravelerService extends BaseService {
    model = TravelerModel

    async addHome(travelerId, homeLocation) {
        const traveler = await this.find(travelerId)

        const home = await HomeService.add({owner: traveler, location: homeLocation})
        traveler.home = home

        await traveler.save()
        
        return home
    }

    async deleteHome(traveler) {
        await HomeService.del(traveler.home)
        traveler.home = undefined
        await traveler.save()
    }

    async askHost(traveler, home, owner) {
        const request = await BookingModel.create({requester: traveler, home: home, status: 'pending'})

        traveler.bookRequest.push(request)
        owner.bookRequest.push(request)

        await traveler.save()
        await owner.save()

        return request
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

        return bookRequest
    }
}

module.exports = new TravelerService()