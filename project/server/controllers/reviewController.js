const db = require('../models');
const Review = db.Review;
const User = db.User;

exports.create = async (req, res) => {
  try {
    const { carId, rating, comment } = req.body;
    const review = await Review.create({
      userId: req.userId,
      carId,
      rating,
      comment
    });
    res.send(review);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAllByCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const reviews = await Review.findAll({
      where: { carId: carId },
      include: [
        { model: User, as: 'User', attributes: ['username'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
