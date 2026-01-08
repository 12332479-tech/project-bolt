const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "car_rental_db", // database name
  "root",          // username
  "",              // password (EMPTY for XAMPP)
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
