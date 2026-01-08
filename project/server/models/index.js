const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Car = require('./Car')(sequelize, Sequelize);
db.Booking = require('./Booking')(sequelize, Sequelize);
db.Review = require('./Review')(sequelize, Sequelize);
db.Message = require('./Message')(sequelize, Sequelize);

// Relationships
db.User.hasMany(db.Booking, { foreignKey: 'userId' });
db.Booking.belongsTo(db.User, { foreignKey: 'userId' });

db.Car.hasMany(db.Booking, { foreignKey: 'carId' });
db.Booking.belongsTo(db.Car, { foreignKey: 'carId' });

db.User.hasMany(db.Review, { foreignKey: 'userId' });
db.Review.belongsTo(db.User, { foreignKey: 'userId' });

db.Car.hasMany(db.Review, { foreignKey: 'carId' });
db.Review.belongsTo(db.Car, { foreignKey: 'carId' });

module.exports = db;
