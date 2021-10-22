const BaseService = require('./base-service')
const HomeModel = require('../models/home')

class HomeService extends BaseService {
    model = HomeModel
}

module.exports = new HomeService()