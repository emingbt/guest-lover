const RatingModel = require('../models/rating')
const BaseService =require('./base-service')

class RatingService extends BaseService {}

module.exports = new RatingService(RatingModel)