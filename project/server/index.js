const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Car Rental API is running');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/car'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/messages', require('./routes/message'));

// Sync Database and Start Server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});


db.sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
