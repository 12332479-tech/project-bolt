const db = require('./models');
const Car = db.Car;
const User = db.User;
const bcrypt = require('bcryptjs');

const cars = [
  {
    name: "Tesla Model S",
    brand: "Tesla",
    year: 2024,
    price: 89990,
    image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Electric luxury sedan with cutting-edge technology and impressive performance.",
    features: ["Autopilot", "Long Range Battery", "Premium Interior", "Ludicrous Mode"],
    isFeatured: true,
    specialPrice: 85000
  },
  {
    name: "Porsche 911",
    brand: "Porsche",
    year: 2024,
    price: 106100,
    image: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Iconic sports car combining timeless design with exhilarating performance.",
    features: ["Twin-Turbo Engine", "Sport Chrono Package", "Leather Interior", "All-Wheel Drive"],
    isFeatured: true
  },
  {
    name: "BMW M4",
    brand: "BMW",
    year: 2024,
    price: 74700,
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "High-performance coupe with aggressive styling and powerful engine.",
    features: ["M TwinPower Turbo", "Carbon Fiber Roof", "M Sport Suspension", "Harman Kardon Sound"]
  },
  {
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    year: 2024,
    price: 114500,
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Ultimate luxury sedan with cutting-edge technology and supreme comfort.",
    features: ["MBUX System", "Massage Seats", "Air Suspension", "Burmester Sound System"]
  },
  {
    name: "Audi R8",
    brand: "Audi",
    year: 2024,
    price: 158600,
    image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Supercar with dramatic styling and breathtaking performance.",
    features: ["V10 Engine", "Quattro AWD", "Virtual Cockpit", "Carbon Ceramic Brakes"]
  },
  {
    name: "Range Rover Sport",
    brand: "Land Rover",
    year: 2024,
    price: 83000,
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Luxury SUV combining off-road capability with refined on-road manners.",
    features: ["Terrain Response", "Air Suspension", "Meridian Sound", "Panoramic Roof"]
  }
];

const seed = async () => {
  try {
    // Disable foreign key checks to allow clearing data
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    
    // Force sync to clear existing data
    await db.sequelize.sync({ force: true });
    
    // Re-enable foreign key checks
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
    
    await Car.bulkCreate(cars);
    console.log('Cars seeded successfully');

    const hashedPassword = await bcrypt.hash('password123', 8);
    
    await User.bulkCreate([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user'
      }
    ]);
    console.log('Users seeded successfully');

    // Seed Reviews
    const user = await User.findOne({ where: { email: 'john@example.com' } });
    const car = await Car.findOne({ where: { name: 'Tesla Model S' } });
    
    if (user && car) {
      await db.Review.create({
        userId: user.id,
        carId: car.id,
        rating: 5,
        comment: "Absolutely amazing experience! The acceleration is mind-blowing."
      });
      console.log('Reviews seeded successfully');
    }

    process.exit();
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
};

seed();
