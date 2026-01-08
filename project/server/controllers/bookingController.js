const db = require('../models');
const Booking = db.Booking;
const Car = db.Car;
const User = db.User;
const emailService = require('../utils/emailService');

exports.create = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice } = req.body;
    
    // Create the booking
    const booking = await Booking.create({
      userId: req.userId,
      carId,
      startDate,
      endDate,
      totalPrice
    });

    // Fetch details for email
    const user = await User.findByPk(req.userId);
    const car = await Car.findByPk(carId);

    // Send confirmation email (async, don't wait for it)
    if (user && car) {
      emailService.sendBookingConfirmation(user, booking, car).catch(err => {
        console.error('Failed to send email:', err);
      });
    }

    res.send(booking);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAllUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.userId },
      include: [
        { model: Car, as: 'Car' }
      ]
    });
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, as: 'User', attributes: ['id', 'username', 'email'] },
        { model: Car, as: 'Car' }
      ]
    });
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
