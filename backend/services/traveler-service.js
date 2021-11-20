const TravelerModel = require('../models/traveler')
const BaseService =require('./base-service')

class TravelerService extends BaseService {}

module.exports = new TravelerService(TravelerModel)