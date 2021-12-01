const BookingModel = require('../models/booking')
const BaseService = require('./base-service')
const TravelerService = require('./traveler-service')
const HomeService = require('./home-service')

class BookingService extends BaseService {
  async askHost(travelerId, homeId) {
    const traveler = await TravelerService.find(travelerId)
    const home = await HomeService.find(homeId)
    const owner = await TravelerService.find(home.owner._id)

    const booking = await this.insert({requester: traveler, home: home, status: 'pending'})

    traveler.bookings.push(booking.toObject())
    owner.bookings.push(booking.toObject())

    await traveler.save()
    await owner.save()

    return booking
  }

  async replyTraveler(ownerId, bookingId, response) {
    const owner = await TravelerService.find(ownerId)
    const booking = await this.find(bookingId)

    if(response == 'accept') {
      booking.status = 'current'
    }
    else {
      booking.status = 'cancelled'
    }

    await booking.save()

    return booking
  }

  async finishBook(ownerId, bookingId, ratingBody) {
    const owner = await TravelerService.find(ownerId)
    const booking = await this.find(bookingId)

    const ratingStars = ratingBody.stars
    const ratingMessage = ratingBody.message

    booking.status = 'past'
    booking.rating = (ratingBody)

    await booking.save()

    return booking
  }
}

module.exports = new BookingService(BookingModel)