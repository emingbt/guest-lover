const HomeModel = require('../models/home')
const BaseService = require('./base-service')
const TravelerService = require('./traveler-service')

class HomeService extends BaseService {
    async addHome(travelerId, homeLocation) {
        const traveler = await TravelerService.find(travelerId)

        const home = await this.insert({owner: traveler, location: homeLocation})
        traveler.home = home.toObject()

        await traveler.save()

        return home
     }

     async deleteHome(travelerId) {
        const traveler = await TravelerService.find(travelerId)

        await this.remove(traveler.home)

        traveler.home = undefined

        await traveler.save()
     }
}

module.exports = new HomeService(HomeModel)