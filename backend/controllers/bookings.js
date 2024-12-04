// models
const Booking = require('../models/Booking');
const User = require('../models/User');

// controllers
const factoryController = require('./factory');
const errorsController = require('./errors');

/*
  This is a helper method abstracted out here. It is used when requesting slots, but also available days.
  This is because when checking if a day is available, we have to see if there exists at least one slot on the day
  that is free.
*/
async function _getAvailableBookingSlots(equipmentID, bookingDate, userEmail) {
    const existingBooking = await Booking.findOne({
        where: {
            equipmentID: parseInt(equipmentID, 10),
            bookingDate,
            userEmail,
        },
    });

    // user can't make two bookings on the same day
    if (existingBooking) {
        return [];
    }

    const bookings = await Booking.findAll({
        where: {
            equipmentID: parseInt(equipmentID, 10),
            bookingDate,
        },
    });

    const unavailableBookingSlots = [];
    bookings.forEach((booking) => {
        unavailableBookingSlots.push(booking.timeSlot1);

        if (booking.timeSlot2) {
            unavailableBookingSlots.push(booking.timeSlot2);
        }
    });

    const availableBookingSlots = Booking.allTimeSlots.filter(
        (slot) => !unavailableBookingSlots.includes(slot)
    );

    return availableBookingSlots;
}

/*
  We can't use the generic factory function because this GET logic isn't generic -- rather than getting all bookings,
  we're simply getting the availability for the booking for a single piece of equipment.
*/
const getAvailableBookingSlots = errorsController.catchAsync(
    async (request, response, next) => {
        if (!request.query.equipmentID || !request.query.bookingDate) {
            throw new errorsController.ErrorWithStatusCode(
                'URL must be of the format /bookings/slots/?equipmentID=<id>&bookingDate=<YYYY-MM-DD>'
            );
        }

        const availableBookingSlots = await _getAvailableBookingSlots(
            request.query.equipmentID,
            request.query.bookingDate,
            request.body.user.email
        );

        return response.status(200).json({
            bookingDate: request.query.bookingDate,
            equipmentID: parseInt(request.query.equipmentID),
            availableBookingSlots,
        });
    }
);

/*
  This is a helper method abstracted out here. It is used when requesting days, but also days + slots. Allows us to
  prevent duplication of code across both controller methods getAvailableBookingDays and getAvailableBookingDaysSlots.
*/
async function _getAvailableBookingDays(user, equipmentID) {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(
        today.getDate() +
            (user.userRole === User.PREMIUM
                ? Booking.premiumUserMaxDaysInFuture
                : Booking.basicUserMaxDaysInFuture)
    );

    const availableBookingDays = [];

    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0]; // format date as YYYY-MM-DD
        const availableBookingSlots = await _getAvailableBookingSlots(
            equipmentID,
            date,
            user.email
        );

        // If there's at least one available slot, add the date to availableBookingDays
        if (availableBookingSlots.length > 0) {
            availableBookingDays.push(date);
        }
    }

    return availableBookingDays;
}

/*
  We can't use the generic factory function because this GET logic isn't generic -- rather than getting all bookings,
  we're simply getting the availability for the booking for a single piece of equipment.
*/
const getAvailableBookingDays = errorsController.catchAsync(
    async (request, response, next) => {
        if (!request.query.equipmentID) {
            throw new errorsController.ErrorWithStatusCode(
                'URL must be of the format /bookings/days/?equipmentID=<id>'
            );
        }

        const availableBookingDays = await _getAvailableBookingDays(
            request.body.user,
            request.query.equipmentID
        );

        return response.status(200).json({
            equipmentID: parseInt(request.query.equipmentID),
            availableBookingDays,
        });
    }
);

/*
  The frontend can theoretically just request all available days, and then for each day request all available slots.
  But this gives that information to the frontend all at once, giving the frontend more flexibility in how it wants to
  show available bookings on the frontend.
*/
const getAvailableBookingDaysSlots = errorsController.catchAsync(
    async (request, response, next) => {
        if (!request.query.equipmentID) {
            throw new errorsController.ErrorWithStatusCode(
                'URL must be of the format /bookings/days/slots?equipmentID=<id>'
            );
        }

        const availableBookingDays = await _getAvailableBookingDays(
            request.body.user,
            request.query.equipmentID
        );

        const availableBookingDaysSlots = {};

        for (const day of availableBookingDays) {
            const availableBookingSlots = await _getAvailableBookingSlots(
                request.query.equipmentID,
                day,
                request.body.user.email
            );

            availableBookingDaysSlots[day] = availableBookingSlots;
        }

        return response.status(200).json({
            equipmentID: request.query.equipmentID,
            availableBookingDaysSlots,
        });
    }
);

/*
  All filters are only used for user associated actions -- prevent user's from creating, getting, or deleting
  the bookings of other users (for privacy and for maintaining the integrity of the platform).
*/

const extractCreateBookingsFilters = errorsController.catchAsync(
    async (request, response, next) => {
        /* this ensures that when creating a booking, the user can't just pass in someone else's email in the
       request body and make a booking on their behalf. It FORCEs the booking to be made for the current user.
    */
        request.body.userEmail = request.body.user.email;

        // move to the next middleware (ie. continue processing the request)
        next();
    }
);

const extractGetANDDeleteANDUpdateBookingsFilters = errorsController.catchAsync(
    async (request, response, next) => {
        request.body.filter = {};

        // email
        /*
      When deleting, this is important -- we don't want the user to be able to delete someone else's booking,
      so we filter the DB so that they can only possibly delete theirs. When an admin is fetching information,
      we want them to be able to see ALL bookings.
    */
        if (
            request.body.user.userRole !== User.ADMIN &&
            request.body.user.email
        ) {
            request.body.filter.userEmail = request.body.user.email;
        }

        // id. Specified in the query when deleting (since DELETE doesn't have a request body as per the REST protocol)
        // and specified in the body when updating (since PATCH has a request body as per the REST protocol)
        if (request.query.id || request.body.id) {
            request.body.filter.id = request.query.id || request.body.id;
        }

        // status - filter by booking status if provided (e.g., approved, pending, rejected)
        if (request.query.status) {
            request.body.filter.status = request.query.status;
        }

        // move to the next middleware (ie. continue processing the request)
        next();
    }
);

const getAllUsersBookings = factoryController.getAll(Booking);
const createBooking = factoryController.createOne(Booking);
const deleteBooking = factoryController.deleteOne(Booking);
const updateBooking = factoryController.updateOne(Booking);

module.exports = {
    getAvailableBookingSlots,
    getAvailableBookingDays,
    getAvailableBookingDaysSlots,
    extractCreateBookingsFilters,
    extractGetANDDeleteANDUpdateBookingsFilters,
    getAllUsersBookings,
    createBooking,
    deleteBooking,
    updateBooking,
};
