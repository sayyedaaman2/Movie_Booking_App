const Booking = require('../models/booking.model')
const constants = require('./constants')

exports.checkBookingStatus = (bookingId) => {

    setTimeout(async () => {
        console.log("Checking status of " + bookingId)
        let booking = await Booking.findOne({_id : bookingId});
        if(booking.status == constants.bookingStatuses.inProgress){
            booking.status = constants.bookingStatuses.failed
        }else{
            return;
        }
        await booking.save();
        console.log(booking);
    }, 120000); // 2 minutes

}