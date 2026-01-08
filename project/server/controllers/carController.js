const db = require('../models');
const Car = db.Car;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.send(car);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, year, isFeatured } = req.query;
    let condition = {};

    if (brand) {
      condition.brand = { [Op.like]: `%${brand}%` };
    }
    if (year) {
      condition.year = year;
    }
    if (isFeatured) {
      condition.isFeatured = isFeatured === 'true';
    }
    if (minPrice || maxPrice) {
      condition.price = {};
      if (minPrice) condition.price[Op.gte] = minPrice;
      if (maxPrice) condition.price[Op.lte] = maxPrice;
    }

    const cars = await Car.findAll({ where: condition });
    res.send(cars);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findByPk(id);
    if (car) {
      res.send(car);
    } else {
      res.status(404).send({ message: `Cannot find Car with id=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Car.update(req.body, {
      where: { id: id }
    });
    if (num == 1) {
      res.send({ message: "Car was updated successfully." });
    } else {
      res.send({ message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Car.destroy({
      where: { id: id }
    });
    if (num == 1) {
      res.send({ message: "Car was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete Car with id=${id}. Maybe Car was not found!` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
