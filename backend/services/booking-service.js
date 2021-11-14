const BookingModel = require('../models/booking')
const BaseService = require('./base-service')
const TravelerService = require('./traveler-service')
const HomeService = require('./home-service')

class BookingService extends BaseService {
  async askHost(travelerId, homeId) {  // isim degisebilir!
    const traveler = await TravelerService.find(travelerId)
    const home = await HomeService.find(homeId)
    const owner = await TravelerService.find(home.owner._id)

    const booking = await this.insert({requester: traveler, home: home, status: 'pending'})

    traveler.bookings.push(booking)
    owner.bookings.push(booking)

    await traveler.save()
    await owner.save()

    return booking
  }

  async replyTraveler(ownerId, bookingId, response) { // isim degisecek
    const owner = await TravelerService.find(ownerId)
    const booking = await this.find(bookingId)
    const home = await HomeService.find(booking.home)

    if(response == 'accept') {
      home.guests.push(booking.requester)
      booking.status = 'current'
    }
    else {
      booking.status = 'cancelled'
    }

    await booking.save()
    await home.save()

    return booking
  }

  async finishBook(ownerId, bookingId) { // bunun olmasi icin bir de rating eklemeli :/
    //acaba finishBooking mi olsa ?
    const owner = await TravelerService.find(ownerId)
    const booking = await this.find(bookingId)
    const home = await HomeService.find(booking.home)
    
    booking.status = 'past'
    home.guests = [] //burada birden fazla misafir de olabilir!!!

    await booking.save()
    await home.save()

    return booking
  }
}

module.exports = new BookingService(BookingModel)