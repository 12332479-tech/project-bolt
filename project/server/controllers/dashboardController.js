const db = require('../models');
const User = db.User;
const Car = db.Car;
const Booking = db.Booking;

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalCars = await Car.count();
    const totalBookings = await Booking.count();
    
    // Calculate total revenue
    const totalRevenueResult = await Booking.sum('totalPrice');
    const totalRevenue = totalRevenueResult || 0;

    // Get recent bookings
    const recentBookings = await Booking.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'User', attributes: ['username'] },
        { model: Car, as: 'Car', attributes: ['name', 'brand'] }
      ]
    });

    res.send({
      totalUsers,
      totalCars,
      totalBookings,
      totalRevenue,
      recentBookings
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
