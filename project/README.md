# Car Rental Application

This is a full-stack Car Rental application built with React (Vite) for the frontend and Node.js/Express for the backend. It uses MySQL as the database.

## Features

- **User Authentication**: Sign up and Sign in functionality.
- **Browse Cars**: View a list of available luxury cars.
- **Car Details**: View detailed information about each car.
- **Booking System**: Authenticated users can book cars.
- **Admin Features**: Admin users can manage cars (Create, Update, Delete) and view all bookings.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Setup Instructions

### Prerequisites

- Node.js installed
- MySQL installed and running

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following content:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=car_rental_db
   JWT_SECRET=your_jwt_secret_key
   ```
   *Note: Make sure to create the database `car_rental_db` in MySQL before running the server, or let Sequelize create the tables (but the DB itself must exist).*

4. Seed the database (optional, to add initial cars):
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the root directory (where `vite.config.js` is located):
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/signin`: Login

### Cars
- `GET /api/cars`: Get all cars (Supports filtering: `?brand=Tesla&minPrice=50000&year=2024`)
- `GET /api/cars/:id`: Get a specific car
- `POST /api/cars`: Create a new car (Admin only)
- `PUT /api/cars/:id`: Update a car (Admin only)
- `DELETE /api/cars/:id`: Delete a car (Admin only)

### Bookings
- `POST /api/bookings`: Create a booking (Authenticated) - *Triggers email notification*
- `GET /api/bookings`: Get user's bookings (Authenticated)
- `GET /api/bookings/all`: Get all bookings (Admin only)

### Dashboard (Admin Only)
- `GET /api/dashboard/stats`: Get system statistics (Users, Cars, Bookings, Revenue)

## Default Users (Seed Data)

After running `node seed.js`, the following users are available:
- **Admin**: `admin@example.com` / `password123`
- **User**: `john@example.com` / `password123`

## Screenshots

*(Add screenshots of your application here)*

## Deployment

The backend is ready to be deployed on platforms like Render or Railway.
1. Push the code to GitHub.
2. Connect your repository to Render/Railway.
3. Set the Root Directory to `server`.
4. Add the environment variables from your `.env` file to the deployment platform.
